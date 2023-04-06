const express = require('express')
const restrict = require('../middleware/restrict')
const router = express.Router()
const bodyParser = require('body-parser')

const authController = require('../controller/authController')

router.post('/login', authController.postLogin)
router.get('/whoami', restrict, authController.getWhoami)

module.exports = router