// routes for /auth
const express = require('express')
const authController = require('../controllers/auth') // getting controller from ../controller
const router = express.Router()

router.post('/register', authController.register)

module.exports = router;