exports.successResponse = (res, data) => res.status(200).json({
  status: 'ok',
  statusCode: 200,
  data,
});

exports.successResponseWithMsg = (res, msg) => res.status(200).json({
  status: 'ok',
  statusCode: 200,
  msg,
});

exports.acceptedResponse = (res, msg) => res.status(202).json({
  status: 'accepted',
  statusCode: 202,
  msg,
});

exports.successCreated = (res, data) => res.status(201).json({
  status: 'created',
  statusCode: 201,
  data,
});

exports.successDeleted = (res) => res.status(204).send();

exports.notFoundResponse = (res, msg) => res.status(404).json({
  status: 'not found',
  statusCode: 404,
  msg,
});

exports.unauthorizedResponse = (res, msg) => res.status(401).json({
  status: 'unauthorized',
  statusCode: 401,
  msg,
});

exports.forbiddenResponse = (res, msg) => res.status(403).json({
  status: 'forbidden',
  statusCode: 403,
  msg,
});

exports.badRequestResponse = (res, msg, errors) => res.status(400).json({
  status: 'bad request',
  statusCode: 400,
  msg,
  errors,
});
