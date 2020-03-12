const express = require("express");
const accountController = require("../controller/accountController");
const router = express.Router();

router.post('/login', accountController.login);
router.post('/register', accountController.register);

module.exports = router;
