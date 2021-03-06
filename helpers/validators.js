const { body, param, validationResult } = require('express-validator');
const responses = require('./responses');

const botanicalFamilyValidationRules = () => [
  body('croatianName').notEmpty().withMessage('Hrvatski naziv je obavezan'),
  body('latinName').notEmpty().withMessage('Latinski naziv je obavezan'),
];

const genusValidationRules = () => [
  body('name').notEmpty().withMessage('Naziv je obavezan'),
  body('botanicalFamilyId').notEmpty().withMessage('Botanička porodica je obavezna'),
];

const plantSpeciesValidationRules = () => [
  body('croatianName').notEmpty().withMessage('Hrvatski naziv je obavezan'),
  body('latinName').notEmpty().withMessage('Latinski naziv je obavezan'),
  body('description').notEmpty().withMessage('Opis je obavezan'),
  body('genusId').notEmpty().withMessage('Biljni rod je obavezan'),
];

const systematistValidationRules = () => [
  body('name').notEmpty().withMessage('Naziv je obavezan'),
];

const subspeciesValidationRules = () => [
  body('name').notEmpty().withMessage('Naziv je obavezan'),
  body('plantSpeciesId').notEmpty().withMessage('Biljna vrsta je obavezna'),
];

const measureUnitValidationRules = () => [
  body('name').notEmpty().withMessage('Naziv je obavezan'),
];

const usefulPartValidationRules = () => [
  body('croatianName').notEmpty().withMessage('Hrvatski naziv je obavezan'),
  body('latinName').notEmpty().withMessage('Latinski naziv je obavezan'),
];

const bioactiveSubstanceValidationRules = () => [
  body('name').notEmpty().withMessage('Naziv je obavezan'),
  body('measureUnitId').notEmpty().withMessage('Mjerna jedinica je obavezna'),
];

const usefulPartImageValidationRules = () => [
  body('name').notEmpty().withMessage('Naziv je obavezan'),
  body('source').notEmpty().withMessage('Izvor je obavezan'),
  body('uploadDate').notEmpty().withMessage('Datum prijenosa je obavezan'),
  param('usefulPartId').isInt().withMessage('Uporabni dio je obavezan'),
  param('plantSpeciesId').isInt().withMessage('Biljna vrsta je obavezna'),
];

const plantSpeiesImageValidationRules = () => [
  body('name').notEmpty().withMessage('Naziv je obavezan'),
  body('source').notEmpty().withMessage('Izvor je obavezan'),
  body('uploadDate').notEmpty().withMessage('Datum prijenosa je obavezan'),
  param('id').isInt().withMessage('Biljna vrsta je obavezna'),
];

const plantPartBioactiveSubstanceRules = () => [
  body('bioactiveSubstanceId').notEmpty().withMessage('Bioaktivna tvar je obavezna'),
  body('content').notEmpty().withMessage('Sadržaj je obavezan'),
  param('usefulPartId').isInt().withMessage('Uporabni dio je obavezan'),
  param('plantSpeciesId').isInt().withMessage('Biljna vrsta je obavezna'),
];

const usefulPartAssigmentRules = () => [
  body('usefulPartId').isInt().withMessage('Uporabni dio je obavezan'),
  body('plantSpeciesId').isInt().withMessage('Biljna vrsta je obavezna'),
];

const createAccountRules = () => [
  body('email').isEmail().withMessage('Unesena E-Mail adresa je neispravna').trim(),
  body('roleId').notEmpty().withMessage('Uloga je obavezna'),
];

const loginRules = () => [
  body('email').isEmail().withMessage('Unesena E-Mail adresa je neispravna').trim(),
  body('password').isLength({ min: 6 }).withMessage('Lozinka mora biti duža od 6 znakova'),
];

const forgotPasswordRules = () => [
  body('email').notEmpty().withMessage('E-Mail je obavezan').trim(),
  body('email').isEmail().withMessage('Unesena E-Mail adresa je neispravna'),
];

const resetPasswordRules = () => [
  param('passwordResetHash').notEmpty().withMessage('Kod za promjenu lozinke je nevazeci'),
  body('newPassword').isLength({ min: 6 }).withMessage('Lozinka mora biti duža od 6 znakova'),
  body('repeatPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Lozinke nisu jednake');
    } else {
      return true;
    }
  }),
];

const activateAccountRules = () => [
  param('activationHash').notEmpty().withMessage('Aktivacijski kod je nevazeci'),
  body('newPassword').isLength({ min: 6 }).withMessage('Lozinka mora biti duža od 6 znakova'),
  body('repeatPassword').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('Lozinke nisu jednake');
    } else {
      return true;
    }
  }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return responses.badRequestResponse(res, 'incorrect parameters', errors.array());
};

module.exports = {
  botanicalFamilyValidationRules,
  genusValidationRules,
  plantSpeciesValidationRules,
  systematistValidationRules,
  subspeciesValidationRules,
  measureUnitValidationRules,
  usefulPartValidationRules,
  bioactiveSubstanceValidationRules,
  usefulPartImageValidationRules,
  plantSpeiesImageValidationRules,
  usefulPartAssigmentRules,
  plantPartBioactiveSubstanceRules,
  createAccountRules,
  loginRules,
  forgotPasswordRules,
  resetPasswordRules,
  activateAccountRules,
  validate,
};
