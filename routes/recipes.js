const express = require('express');
const router = express.Router();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

const contactsController = require('../controllers/recipes');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.addOne);

router.put('/:id', contactsController.editOne);

router.delete('/:id', contactsController.deleteOne);

// router.use('/api-docs', swaggerUi.serve);

// router.get('/api-docs', swaggerUi.setup(swaggerDocument));



module.exports = router;