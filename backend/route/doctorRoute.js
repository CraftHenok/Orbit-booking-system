const express = require("express");
const doctorsController = require("../controller/doctorsController");
const router = express.Router();


/**
 * @swagger
 *
 * definitions:
 *   Doctor:
 *     type: object
 *     required:
 *       - name
 *       - username
 *       - password
 *       - displayOrder
 *       - manageBlocks
 *       - manageBooking
 *       - isDoctor
 *     properties:
 *       name:
 *         type: string
 *         description: the name of the doctor
 *       username:
 *         type: string
 *         description: unique user name of the doctor
 *       password:
 *          type: string
 *          description: password
 *       displayOrder:
 *          type: integer
 *          description: the position of the doctor in the doctor's queue
 *       manageBooking:
 *          type: boolean
 *          description: weather the doctor manage it's booking
 *       manageBlocks:
 *          type: boolean
 *          description: manageBlocks?
 *       isDoctor:
 *          type: boolean
 *          description: doctor or not
 */


/**
 * @swagger
 * /doctor:
 *  get:
 *    description: get all showdoctors
 *    tags:
 *      - doctor
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: all or empty list of showdoctors
 */
router.get('/', doctorsController.getAllDoctors);

/**
 * @swagger
 * /doctor/byId/{id}:
 *  get:
 *    description: get doctor by it's id
 *    tags:
 *      - doctor
 *    parameters:
 *      - name: id
 *        description: the id of the doctor
 *        required: true
 *        in: path
 *        type: integer
 *        schema:
 *          minimum: 1
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: return a doctor matching the id
 */
router.get('/byId/:id', doctorsController.getDoctorById);


/**
 * @swagger
 * /doctor:
 *  post:
 *    description: save new doctor
 *    tags:
 *      - doctor
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Doctor'
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: doctor is saved
 */
router.post('/', doctorsController.saveNewDoctor);

/**
 * @swagger
 * /doctor/{id}:
 *  put:
 *    description: update doctor
 *    tags:
 *      - doctor
 *    parameters:
 *      - name: id
 *        description: the id of the doctor
 *        required: true
 *        in: path
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Doctor'
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: doctor is updated
 */
router.put('/:id', doctorsController.update);

/**
 * @swagger
 * /doctor/{id}:
 *  delete:
 *    description: get showdoctors by name
 *    tags:
 *      - doctor
 *    parameters:
 *      - name: id
 *        description: the doctor's id to delete
 *        required: true
 *        in: path
 *        type: integer
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: doctor deleted successfully
 *      404:
 *        description: the doctor trying to delete doesn't exist
 */
router.delete('/:id', doctorsController.deleteDoctorById);

module.exports = router;
