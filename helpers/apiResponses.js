exports.successResponseWithData = (res, data) => {
  const resData = {
    status: 'success',
    data,
  };
  return res.status(200).json(resData);
};

exports.successCreatedWithData = (res, data) => {
  const resData = {
    status: 'success',
    data,
  };
  return res.status(201).json(resData);
};

exports.ErrorResponse = (res, msg) => {
  const data = {
    status: 'error',
    message: msg,
  };
  return res.status(500).json(data);
};

exports.notFoundResponse = (res, msg) => {
  const data = {
    status: 'error',
    message: msg,
  };
  return res.status(404).json(data);
};

exports.validationErrorWithData = (res, data) => {
  const resData = {
    status: 'fail',
    data,
  };
  return res.status(400).json(resData);
};

exports.unauthorizedResponse = (res, msg) => {
  const data = {
    status: 'error',
    message: msg,
  };
  return res.status(401).json(data);
};

exports.successResponseDeleted = (res) => res.status(204).send();
