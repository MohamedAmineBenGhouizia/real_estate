const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const validate = require('../middlewares/validateMiddleware');
const { authSchemas } = require('../validators/schemas');

router.post('/register', validate(authSchemas.register), authController.register);
router.post('/login', validate(authSchemas.login), authController.login);
router.get('/me', protect, authController.getMe);

module.exports = router;
