const express = require("express");
const accountManagerController = require("../controller/receptionController");
const router = express.Router();

/**
 * @swagger
 * /reception/:
 *  get:
 *    description: get all reception
 *    tags:
 *      - reception
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: list of receptions
 */
router.get('/', accountManagerController.getAllReception);

module.exports = router;
