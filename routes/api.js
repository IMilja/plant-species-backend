const { Router } = require('express');
const botanicalFamilyController = require('../controllers/botanicalFamily');
const genusController = require('../controllers/genus');
const systematistController = require('../controllers/systematist');
const plantSpeciesController = require('../controllers/plantSpecies');
const subspeciesController = require('../controllers/subspecies');
const usefulPartController = require('../controllers/usefulPart');
const plantPartController = require('../controllers/plantPart');
const measureUnitController = require('../controllers/measureUnit');
const bioactiveSubstanceController = require('../controllers/bioactiveSubstance');
const imageController = require('../controllers/image');

const router = Router();

router.use('/botanical-families', botanicalFamilyController);
router.use('/genera', genusController);
router.use('/systematists', systematistController);
router.use('/plant-species', plantSpeciesController);
router.use('/subspecies', subspeciesController);
router.use('/useful-parts', usefulPartController);
router.use('/plant-parts', plantPartController);
router.use('/measure-units', measureUnitController);
router.use('/bioactive-substances', bioactiveSubstanceController);
router.use('/images', imageController);

module.exports = router;
