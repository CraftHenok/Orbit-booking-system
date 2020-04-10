const express = require("express");
const accountManagerController = require("../controller/receptionController");
const router = express.Router();

router.get('/', accountManagerController.getAllReception);

module.exports = router;
