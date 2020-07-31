const { Router } = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const responses = require('../helpers/responses');
const mailer = require('../helpers/mailer');
const config = require('../config');
const {
  createAccountRules,
  loginRules,
  forgotPasswordRules,
  resetPasswordRules,
  activateAccountRules,
  validate,
} = require('../helpers/validators');
const {
  isAuthenticated,
  isSuperAdmin,
  generateAccessToken,
} = require('../lib/jwtTokens');

const router = Router();

router.post('/login', loginRules(), validate, async (req, res, next) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const user = await User.query().first().where({
      email,
    }).withGraphFetched({
      role: true,
    });

    if (!user) {
      return responses.unauthorizedResponse(res, 'Netočan e-mail ili lozinka');
    }

    if (!user.active) {
      return responses.unauthorizedResponse(res, 'Vaš korisnički račun nije aktiviran');
    }

    const validPassword = await user.verifyPassword(password);

    if (!validPassword) {
      return responses.unauthorizedResponse(res, 'Netočan e-mail ili lozinka');
    }

    const accessToken = generateAccessToken({
      id: user.id,
      role: user.role.name,
    });

    return responses.successResponse(res, {
      accessToken,
      userRole: user.role.name,
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/', isAuthenticated, isSuperAdmin, async (req, res, next) => {
  try {
    const data = await User
      .query()
      .withGraphFetched({
        role: true,
      });

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.post('/', isAuthenticated, isSuperAdmin, createAccountRules(), validate, async (req, res, next) => {
  try {
    const {
      email,
      roleId,
    } = req.body;

    const password = `biljne_vrste_${Date.now()}`;
    const activationHash = crypto.randomBytes(36).toString('hex');

    const data = await User.query().insertAndFetch({
      email,
      password,
      activationHash,
      roleId,
    }).withGraphFetched({
      role: true,
    });

    const activationUrl = `${config.frontendDomain}/users/activate-account?activationHash=${activationHash}`;

    const mailOptions = {
      from: 'no-replay@biljne-vrste.hr',
      to: email,
      subject: 'Kreiran racun za aplikaciju biljne vrste',
      template: 'newAccount',
      context: {
        email,
        password,
        activationUrl,
      },
    };

    await mailer.sendMail(mailOptions);

    return responses.successCreated(res, {
      id: data.id,
      email,
      role: data.role,
      roleId: data.role.id,
    });
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id(\\d+)', isAuthenticated, isSuperAdmin, async (req, res, next) => {
  try {
    const {
      id,
    } = req.params;

    const {
      roleId,
    } = req.body;

    const data = await User
      .query()
      .patchAndFetchById(id, {
        roleId,
      })
      .withGraphFetched({
        role: true,
      });

    if (!data) {
      return responses.notFoundResponse(res, 'resource not found');
    }

    return responses.successResponse(res, data);
  } catch (error) {
    return next(error);
  }
});

router.put('/activate-account/:activationHash', activateAccountRules(), validate, async (req, res, next) => {
  try {
    const {
      newPassword,
    } = req.body;

    const {
      activationHash,
    } = req.params;

    const user = await User.query().first().where({
      activation_hash: activationHash,
    });

    if (!user) {
      return responses.badRequestResponse(res, 'Korisnički račun ne postoji ili je aktivacijski kod nevazeci');
    }

    if (user.active) {
      return responses.successResponseWithMsg(res, 'Korisnički račun je već aktivan');
    }

    await user.$query().patch({
      active: true,
      activationHash: null,
      password: newPassword,
    });

    return responses.successResponseWithMsg(res, 'Korisnički račun je uspješno aktiviran');
  } catch (error) {
    return next(error);
  }
});

router.post('/forgot-password', forgotPasswordRules(), validate, async (req, res, next) => {
  try {
    const {
      email,
    } = req.body;

    const passwordResetHash = crypto.randomBytes(36).toString('hex');
    const resetLink = `${config.frontendDomain}/users/reset-password?passwordResetHash=${passwordResetHash}`;

    const user = await User.query().first().where({
      email,
    }).withGraphFetched({
      role: true,
    });

    if (!user) {
      return responses.notFoundResponse(res, 'Korisnički račun ne postoji');
    }

    if (user.passwordResetHash) {
      return responses.badRequestResponse(res, 'Mail za obnovu lozinke je već poslan');
    }

    await user.$query().patch({
      passwordResetHash,
    });

    const mailOptions = {
      from: 'no-replay@biljne-vrste.hr',
      to: email,
      subject: 'Obnova lozinke',
      template: 'passwordReset',
      context: {
        resetLink,
      },
    };

    await mailer.sendMail(mailOptions);

    return responses.acceptedResponse(res, 'Poslan vam je E-Mail za obnovu lozinke');
  } catch (error) {
    return next(error);
  }
});


router.put('/forgot-password/:passwordResetHash', resetPasswordRules(), validate, async (req, res, next) => {
  try {
    const {
      newPassword,
    } = req.body;

    const {
      passwordResetHash,
    } = req.params;

    const user = await User.query().first().where({
      password_reset_hash: passwordResetHash,
    }).withGraphFetched({
      role: true,
    });

    if (!user) {
      return responses.badRequestResponse(res, 'Kod za promjenu lozinke je neispravan ili je istekao');
    }

    await user.$query().patch({
      passwordResetHash: null,
      password: newPassword,
    });

    return responses.successResponseWithMsg(res, 'Lozinka je uspješno promjenjena');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
