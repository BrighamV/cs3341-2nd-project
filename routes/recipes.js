const express = require('express');
const router = express.Router();


const contactsController = require('../controllers/recipes');
const validation = require('../middleware/validate');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', validation.saveRecipe, contactsController.addOne);

router.put('/:id',validation.saveRecipe, contactsController.editOne);

router.delete('/:id', contactsController.deleteOne);



module.exports = router;