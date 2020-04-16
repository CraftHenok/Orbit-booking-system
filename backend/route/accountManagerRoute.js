const express = require("express");
const accountManagerController = require("../controller/accountManagerController");
const router = express.Router();

router.get('/', accountManagerController.getAccountInfoByToken);
router.put('/', accountManagerController.updateAccountInfoByToken);
router.put('/:id', accountManagerController.updateAccountInfoById);
router.delete('/:id', accountManagerController.deleteAccount);
router.get('/:id', accountManagerController.getAccountInfoById);

module.exports = router;
