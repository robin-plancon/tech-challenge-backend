const express = require('express');
const {check} = require ('express-validator');

const personsController = require('../controllers/persons-controllers');

const router = express.Router();

router.get('/', personsController.getPersons);
router.post('/',[check('name').not().isEmpty()], personsController.addPerson);

module.exports = router;