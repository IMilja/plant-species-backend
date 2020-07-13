const {
  ForeignKeyViolationError,
  ConstraintViolationError,
} = require('objection');

module.exports = (err, req, res, next) => {
  if (err instanceof ForeignKeyViolationError) {
    res.status(409).send({
      status: 'conflict',
      statusCode: 409,
      msg: 'Forigen key violation',
    });
  } else if (err instanceof ConstraintViolationError) {
    res.status(409).send({
      status: 'conflict',
      statusCode: 409,
      msg: 'Constraint violation',
    });
  } else {
    res.status(500).send({
      status: 'unknown error',
      statusCode: 500,
      msg: 'Internal server error',
    });
  }
  next();
};
