const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);

    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
}); 

const contactsController = require('../controllers/recipes');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', upload.single('productImage'), contactsController.addOne);

router.put('/:id', contactsController.editOne);

router.delete('/:id', contactsController.deleteOne);

// router.use('/api-docs', swaggerUi.serve);

// router.get('/api-docs', swaggerUi.setup(swaggerDocument));



module.exports = router;