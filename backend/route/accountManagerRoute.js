const express = require("express");
const accountManagerController = require("../controller/accountManagerController");
const router = express.Router();

router.get('/', accountManagerController.getAccountInfo);
router.put('/', accountManagerController.updateAccountInfo);
router.put('/:id', accountManagerController.updateAccountInfoById);
router.delete('/:id', accountManagerController.deleteAccount);
router.get('/:id', accountManagerController.getAccountInfoById);

module.exports = router;
