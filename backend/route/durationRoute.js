const express = require("express");
const durationController = require("../controller/durationController");
const router = express.Router();

/**
 * @swagger
 * /duration:
 *  get:
 *    description: get all duration
 *    tags:
 *      - duration
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: list of durations
 */
router.get("/", durationController.getAllDuration);

/**
 * @swagger
 * /duration:
 *  post:
 *    description: save new duration
 *    tags:
 *      - duration
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                duration:
 *                  type: string
 *    produces:
 *      -application/json
 *    responses:
 *      201:
 *        description: duration is saved
 */
router.post("/", durationController.saveDuration);


/**
 * @swagger
 * /duration/{durationId}:
 *  delete:
 *    description: delete duration by id
 *    tags:
 *      - duration
 *    parameters:
 *      - name: durationId
 *        description: the duration id to delete
 *        required: true
 *        type: integer
 *        in: path
 *    produces:
 *      -application/json
 *    responses:
 *      204:
 *        description: number of rows affected in duration
 */
router.delete("/:id", durationController.deleteDuration);


/**
 * @swagger
 * /duration/{durationId}:
 *  put:
 *    description: update duration
 *    tags:
 *      - duration
 *    parameters:
 *      - name: durationId
 *        description: the duration id to update
 *        required: true
 *        type: integer
 *        in: path
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                duration:
 *                  type: integer
 *                  minimum: 1
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: number of rows affected in duration table
 */
router.put("/:id", durationController.editDuration);

module.exports = router;
