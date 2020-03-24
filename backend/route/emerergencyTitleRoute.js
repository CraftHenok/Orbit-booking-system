const express = require("express");
const emergencyTitleController = require("../controller/emergencyTitleController");
const router = express.Router();

/**
 * @swagger
 * /emergencyTitle:
 *  get:
 *    description: get available patient emergency Title
 *    tags:
 *      - emergency title
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: available list of showpatients emergency Title
 */
router.get("/", emergencyTitleController.getAllEmergencyTitle);

/**
 * @swagger
 * /emergencyTitle:
 *  post:
 *    description: save new emergency title
 *    tags:
 *      - emergency title
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: emergency title is saved
 */
router.post("/", emergencyTitleController.saveEmergencyTitle);


/**
 * @swagger
 * /emergencyTitle/{emergencyTitleId}:
 *  delete:
 *    description: delete emergency title
 *    tags:
 *      - emergency title
 *    parameters:
 *      - name: appointmentTypeId
 *        description: the emergency title's id to delete
 *        required: true
 *        type: integer
 *        in: path
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: number of rows affected in emergency title
 */
router.delete("/:id", emergencyTitleController.deleteEmergencyTitle);

/**
 * @swagger
 * /emergencyTitle/{emergencyTitleId}:
 *  put:
 *    description: update emergency title
 *    tags:
 *      - emergency title
 *    parameters:
 *      - name: emergencyTitleId
 *        description: the emergency title's id to delete
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
 *                title:
 *                  type: string
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: number of rows affected in emergency title
 */
router.put("/:id", emergencyTitleController.updateEmergencyTitle);

module.exports = router;
