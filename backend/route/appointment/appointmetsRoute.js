const express = require("express");
const appointmentController = require("../../controller/appointment/appointmentsController");
const router = express.Router();


/**
 * @swagger
 *
 * definitions:
 *   NewAppointment:
 *     type: object
 *     required:
 *       - patientId
 *       - appointmentTypeId
 *       - appointmentStatusId
 *       - startDateTime
 *       - endDateTime
 *       - isServed
 *       - servedBy
 *     properties:
 *       patientId:
 *         type: integer
 *         description: patient id that requested this appointment
 *         minimum: 1
 *       appointmentTypeId:
 *         type: integer
 *         description: reference id of appointment type
 *         minimum: 1
 *       appointmentStatusId:
 *          type: integer
 *          description: reference id of appointment status
 *          minimum: 1
 *       startDateTime:
 *          type: string
 *          description: the appointment start date
 *       endDateTime:
 *          type: string
 *          description: the appointment ending date
 *       isServed:
 *          type: boolean
 *          description: weather it is served by the doctor or not
 *       servedBy:
 *          type: integer
 *          description: the id of the doctor handling the appointment
 *          minimum: 1
 */


/**
 * @swagger
 * /appointment/:
 *  get:
 *    description: get all appointments
 *    tags:
 *      - appointment
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: get all list of appointments
 */
router.get('/', appointmentController.getAllAppointments);

/**
 * @swagger
 * /appointment/doctors:
 *  get:
 *    description: get doctor's appointment using token
 *    produces:
 *      -application/json
 *    tags:
 *      - appointment
 *    responses:
 *      200:
 *        description: list of doctor's appointments
 */
router.get('/doctors', appointmentController.getLogedInDoctorAppointment);


/**
 * @swagger
 * /appointment/doctors/{doctors}:
 *  get:
 *    description: get all doctor's appointment by doctor id
 *    produces:
 *      -application/json
 *    tags:
 *      - appointment
 *    parameters:
 *       - name: doctorId
 *         description: the id of the doctor.
 *         required: true
 *         in: path
 *         schema:
 *            type: integer
 *            minimum: 1
 *    responses:
 *      200:
 *        description: list of doctors appointment
 */
router.get('/doctors/:doctorId', appointmentController.getDoctorAppointmentByItsId);

/**
 * @swagger
 * /appointment:
 *  post:
 *    description: save new appointment
 *    tags:
 *      - appointment
 *    produces:
 *      -application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/NewAppointment'
 *    responses:
 *      201:
 *        description: list of appointment status
 */
router.post('/', appointmentController.saveNewAppointment);

/**
 * @swagger
 * /appointment/{appointmentId}:
 *  delete:
 *    description: delete appointment with the appointment id
 *    tags:
 *      - appointment
 *    produces:
 *      -application/json
 *    parameters:
 *       - name: appointmentId
 *         description: the id of the appointment to delete.
 *         required: true
 *         in: path
 *         schema:
 *            type: integer
 *            minimum: 1
 *    responses:
 *      204:
 *        description: appointment is deleted
 *      404:
 *         description: the appointment trying to delete doesn't exist
 */
router.delete('/:appointmentId', appointmentController.deleteAppointmentById);

/**
 * @swagger
 * /appointment/{appointmentId}:
 *  put:
 *    description: update appointment by id
 *    tags:
 *      - appointment
 *    produces:
 *      -application/json
 *    parameters:
 *      - name: appointmentId
 *        description: the id of the appointment to update
 *        required: true
 *        in: path
 *        schema:
 *          type: integer
 *          minimum: 1
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/NewAppointment'
 *    responses:
 *      200:
 *        description: the number of rows affected
 */
router.put('/:appointmentId', appointmentController.updateAppointment);

module.exports = router;
