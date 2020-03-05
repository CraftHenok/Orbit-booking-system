const express = require("express");
const appointmentTypeController = require("../../controller/appointment/appointmentTypeController");
const router = express.Router();

/**
 * @swagger
 * /appointmentType:
 *  get:
 *    description: get appointment types
 *    tags:
 *      - appointment types
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: list of appointment types
 */
router.get("/", appointmentTypeController.getAllAppointmentTypes);


/**
 * @swagger
 * /appointmentType:
 *  post:
 *    description: save new appointment Type
 *    tags:
 *      - appointment types
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                type:
 *                  type: string
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: new appointment type is saved
 */
router.post("/", appointmentTypeController.saveAppointmentType);


/**
 * @swagger
 * /appointmentType/{appointmentTypeId}:
 *  delete:
 *    description: delete appointment types
 *    tags:
 *      - appointment types
 *    parameters:
 *      - name: appointmentTypeId
 *        description: the appointment type's id to delete
 *        required: true
 *        type: integer
 *        in: path
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: number of rows affected in appointment types
 */
router.delete("/:id", appointmentTypeController.deleteAppointmentType);


/**
 * @swagger
 * /appointmentType/{appointmentTypeId}:
 *  put:
 *    description: update appointment types
 *    tags:
 *      - appointment types
 *    parameters:
 *      - name: appointmentTypeId
 *        description: the appointment type's id to update
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
 *                type:
 *                  type: string
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: number of rows affected in appointment types
 */
router.put("/:id", appointmentTypeController.updateAppointmentType);

module.exports = router;
