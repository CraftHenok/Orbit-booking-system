const express = require("express");
const appointmentController = require("../controller/appointmentsController");
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
 *        description: all or empty appointments
 */
router.get('/', appointmentController.getAllAppointments);

/**
 * @swagger
 * /appointment/doctors/{doctorId}:
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
router.get('/doctors/:doctorId', appointmentController.getDoctorAppointments);


/**
 * @swagger
 * /appointment/patients/{patientId}:
 *  get:
 *    description: get all patient's appointment by patient id
 *    produces:
 *      -application/json
 *    tags:
 *      - appointment
 *    parameters:
 *       - name: patientId
 *         description: the id of the patient.
 *         required: true
 *         in: path
 *         schema:
 *            type: integer
 *            minimum: 1
 *    responses:
 *      200:
 *        description: list of patient's appointment
 */
router.get('/patients/:patientId', appointmentController.getPatientAppointment);

/**
 * @swagger
 * /appointment/appointmentType:
 *  get:
 *    description: get appointment types
 *    tags:
 *      - appointment
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: list of appointment types
 */
router.get('/appointmentType', appointmentController.getAppointmentTypes);

/**
 * @swagger
 * /appointment/appointmentStatus:
 *  get:
 *    description: get appointment status
 *    tags:
 *      - appointment
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: list of appointment status
 */
router.get('/appointmentStatus', appointmentController.getAppointmentStatus);

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
 *      200:
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
 *      200:
 *        description: appointment is deleted
 *      404:
 *         description: the appointment trying to delete doesn't exist
 */
router.delete('/:appointmentId', appointmentController.deleteAppointmentById);

/**
 * @swagger
 * /appointment/{appointmentId}:
 *  put:
 *    description: update appointment
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
 *        description: appointment updated
 */
router.put('/:appointmentId', appointmentController.updateAppointment);

module.exports = router;
