const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.use(protect); // All routes require authentication

router.get('/', admin, userController.getAllUsers);
router.get('/:id', admin, userController.getUserById);
router.put('/:id/role', admin, userController.updateUserRole);
router.delete('/:id', admin, userController.deleteUser);

module.exports = router;
