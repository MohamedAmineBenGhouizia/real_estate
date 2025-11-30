const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.use(protect); // All routes require authentication

router.get('/', admin, userController.getAllUsers);
router.put('/profile', userController.updateProfile);
router.post('/', admin, userController.createUser);
router.get('/:id', admin, userController.getUserById);
router.put('/:id', admin, userController.updateUser);
router.put('/:id/role', admin, userController.updateUserRole);
router.delete('/:id', admin, userController.deleteUser);

module.exports = router;
