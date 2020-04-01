const express = require("express");
const accountManagerController = require("../controller/accountManagerController");
const router = express.Router();

router.get('/', accountManagerController.getAccountInfo);
router.put('/', accountManagerController.updateAccountInfo);

module.exports = router;
