const router = require('express').Router();

const authController = require('../controllers/authController');

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get("/getUser", authController.getUserByToken);

router.post('/logout', authController.logout);

module.exports = router;

