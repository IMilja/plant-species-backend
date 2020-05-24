const { body, validationResult } = require('express-validator');
const apiResponses = require('./apiResponses');

const botanicalFamilyValidationRules = () => [
  body('croatianName').notEmpty().withMessage('Polje hrvatski naziv je obavezno'),
  body('latinName').notEmpty().withMessage('Polje latinski naziv je obavezno'),
];

const genusValidationRules = () => [
  body('name').notEmpty().withMessage('Polje naziv je obavezno'),
  body('botanicalFamilyId').notEmpty().withMessage('Polje biljna prodiva je obavezno'),
];

const plantSpeciesValidationRules = () => [
  body('croatianName').notEmpty().withMessage('Polje hrvatski naziv je obavezno'),
  body('latinName').notEmpty().withMessage('Polje latinski naziv je obavezno'),
  body('description').notEmpty().withMessage('Polje opis je obavezno'),
  body('genusId').notEmpty().withMessage('Polje biljni rod je obavezno'),
];

const systematistValidationRules = () => [
  body('name').notEmpty().withMessage('Polje naziv je obavezno'),
];

const subspeciesValidationRules = () => [
  body('name').notEmpty().withMessage('Polje naziv je obavezno'),
  body('plantSpeciesId').notEmpty().withMessage('Polje biljna vrsta je obavezeno'),
];

const measureUnitValidationRules = () => [
  body('name').notEmpty().withMessage('Polje naziv je obavezno'),
];

const usefulPartValidationRules = () => [
  body('croatianName').notEmpty().withMessage('Polje hrvatski naziv je obavezno'),
  body('latinName').notEmpty().withMessage('Polje latinski naziv je obavezno'),
];

const bioactiveSubstanceRules = () => [
  body('name').notEmpty().withMessage('Polje naziv je obavezno'),
  body('content').notEmpty().withMessage('Polje sadržaj je obavezno'),
  body('unitOfMeasureId').notEmpty().withMessage('Odaberite mjernu jedincu'),
];


const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return apiResponses
    .validationErrorWithData(res, extractedErrors);
};

module.exports = {
  botanicalFamilyValidationRules,
  genusValidationRules,
  plantSpeciesValidationRules,
  systematistValidationRules,
  subspeciesValidationRules,
  measureUnitValidationRules,
  usefulPartValidationRules,
  bioactiveSubstanceRules,
  validate,
};
