const express = require("express");
const appointmentStatusController = require("../../controller/appointment/appointmentStatusController");
const router = express.Router();

/**
 * @swagger
 * /appointmentStatus:
 *  get:
 *    description: get appointment status
 *    tags:
 *      - appointment status
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: list of appointment status
 */
router.get("/", appointmentStatusController.getAllAppointmentStatus);


/**
 * @swagger
 * /appointmentStatus:
 *  post:
 *    description: save new appointment status
 *    tags:
 *      - appointment status
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: appointment status is saved
 */
router.post("/", appointmentStatusController.saveAppointmentStatus);

/**
 * @swagger
 * /appointmentStatus/{appointmentStatusId}:
 *  delete:
 *    description: delete appointment status
 *    tags:
 *      - appointment status
 *    parameters:
 *      - name: appointmentStatusId
 *        required: true
 *        type: integer
 *        in: path
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: number of rows affected in appointment status
 */
router.delete("/:id", appointmentStatusController.deleteAppointmentStatus);

/**
 * @swagger
 * /appointmentStatus/{appointmentStatusId}:
 *  put:
 *    description: update appointment status
 *    tags:
 *      - appointment status
 *    parameters:
 *      - name: appointmentStatusId
 *        required: true
 *        description: appointment status id to update
 *        type: integer
 *        in: path
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: number of rows affected in appointment status
 */
router.put("/:id", appointmentStatusController.updateAppointmentStatus);

module.exports = router;
