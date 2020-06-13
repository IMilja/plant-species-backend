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
  validate,
};
