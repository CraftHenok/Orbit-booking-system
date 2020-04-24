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
 *       - username
 *       - email
 *       - password
 *       - status
 *       - displayOrder
 *     properties:
 *       username:
 *         type: string
 *         description: the name of the doctor
 *       password:
 *          type: string
 *          description: password (password length must be at least 6 characters long)
 *       displayOrder:
 *          type: integer
 *          description: the position of the doctor in the doctor's queue
 *          minimum: 1
 *       status:
 *          type: string
 *          description: the status of the doctor (can be approved,suspended,)
 *       email:
 *          type: string
 *          description: doctor's email address
 */


/**
 * @swagger
 * /doctor:
 *  get:
 *    description: get all doctors
 *    tags:
 *      - doctor
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: list of all doctors
 */
router.get('/', doctorsController.getAllDoctors);

/**
 * @swagger
 * /doctor/byId/{id}:
 *  get:
 *    description: get doctor's profile by id
 *    tags:
 *      - doctor
 *    parameters:
 *       - name: id
 *         description: the id of the doctor.
 *         required: true
 *         in: path
 *         schema:
 *            type: integer
 *            minimum: 1
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: doctor profile is returned
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
 *      201:
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
 *    description: delete doctors by id
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
 *      204:
 *        description: the number of rows affected
 *      404:
 *        description: the doctor doesn't exist
 */
router.delete('/:id', doctorsController.deleteDoctorById);

module.exports = router;
