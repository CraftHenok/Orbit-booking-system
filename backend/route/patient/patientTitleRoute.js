const express = require("express");
const patientTitleController = require("../../controller/patient/patientTitleController");
const router = express.Router();

/**
 * @swagger
 * /patientTitle:
 *  get:
 *    description: get all patient's titles
 *    tags:
 *      - patient Title
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: available list of patients title
 */
router.get("/", patientTitleController.getAllPatientTitle);

/**
 * @swagger
 * /patientTitle:
 *  post:
 *    description: save new patient Title
 *    tags:
 *      - patient Title
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
 *      201:
 *        description: patient title is saved
 */
router.post("/", patientTitleController.savePatientTitle);

/**
 * @swagger
 * /patientTitle/{patientTitleId}:
 *  delete:
 *    description: delete patient titles
 *    tags:
 *      - patient Title
 *    parameters:
 *      - name: patientTitleId
 *        description: the patient title's id to delete
 *        required: true
 *        type: integer
 *        in: path
 *    produces:
 *      -application/json
 *    responses:
 *      204:
 *        description: number of rows affected in patients title
 */
router.delete("/:id", patientTitleController.deletePatientTitle);


/**
 * @swagger
 * /patientTitle/{patientTitleId}:
 *  put:
 *    description: update patient titles
 *    tags:
 *      - patient Title
 *    parameters:
 *      - name: patientTitleId
 *        description: the patient title's id to update
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
 *        description: number of rows affected in patient's title
 */
router.put("/:id", patientTitleController.updatePatientTitle);

module.exports = router;
