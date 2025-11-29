const express = require('express');
const router = express.Router();
const {
    getProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty
} = require('../controllers/propertyController');
const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
    .get(getProperties)
    .post(protect, admin, upload.array('images'), createProperty);

router.route('/:id')
    .get(getProperty)
    .put(protect, admin, upload.array('images'), updateProperty)
    .delete(protect, admin, deleteProperty);

module.exports = router;
