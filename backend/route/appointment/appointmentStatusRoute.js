const express = require("express");
const appointmentStatusController = require("../../controller/appointment/appointmentStatusController");
const router = express.Router();

/**
 * @swagger
 * /appointmentStatus:
 *  get:
 *    description: get all appointment status
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
 *      201:
 *        description: appointment status is saved
 */
router.post("/", appointmentStatusController.saveAppointmentStatus);

/**
 * @swagger
 * /appointmentStatus/{appointmentStatusId}:
 *  delete:
 *    description: delete appointment status by id
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
 *      204:
 *        description: number of rows affected in appointment status
 */
router.delete("/:id", appointmentStatusController.deleteAppointmentStatus);

/**
 * @swagger
 * /appointmentStatus/{appointmentStatusId}:
 *  put:
 *    description: update appointment status by id
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
