const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { protect, admin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { propertySchemas } = require('../validators/schemas');

router.get('/', propertyController.getProperties);
router.get('/:id/availability', propertyController.getAvailability);
router.get('/:id', propertyController.getProperty);
router.post('/', protect, admin, upload.array('images', 5), validate(propertySchemas.create), propertyController.createProperty);
router.put('/:id', protect, admin, upload.array('images', 5), validate(propertySchemas.update), propertyController.updateProperty);
router.delete('/:id', protect, admin, propertyController.deleteProperty);

module.exports = router;
