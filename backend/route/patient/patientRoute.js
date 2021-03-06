const express = require("express");
const patientsController = require("../../controller/patient/patientsController");
const router = express.Router();

/**
 * @swagger
 *
 * definitions:
 *   Address:
 *     type: object
 *     properties:
 *       line1:
 *         type: string
 *         description: patient's address line 1
 *       line2:
 *         type: string
 *         description: patient's address line 2
 *       city:
 *          type: string
 *          description: patient's address city
 *       country:
 *          type: string
 *          description: patient's address country
 */

/**
 * @swagger
 *
 * definitions:
 *   EmergencyInfo:
 *     type: object
 *     properties:
 *       emergencyTitleId:
 *         type: string
 *         description: patient's emergency title info id
 *         minimum: 1
 *       name:
 *         type: string
 *         description: patient's emergency contact info name
 *       phoneNumber:
 *          type: string
 *          description: patient's emergency contact phoneNumber
 *       alternatePhoneNumber:
 *          type: string
 *          description: patient's emergency contact secondary phone number
 */

/**
 * @swagger
 *
 * definitions:
 *   Contact:
 *     type: object
 *     required:
 *       - phoneNumber
 *     properties:
 *       email:
 *         type: string
 *         description: patient's email address
 *       phoneNumber:
 *         type: string
 *         description: patient's primary phone number
 *       alternatePhoneNumber:
 *          type: string
 *          description: patient's secondary or alternative phone number
 */


/**
 * @swagger
 *
 * definitions:
 *   Patient:
 *     type: object
 *     required:
 *       - patientTitleId
 *       - firstName
 *       - middleName
 *       - lastName
 *       - gender
 *       - dateOfBirth
 *       - age
 *       - contact
 *       - address
 *       - emergencyInfo
 *     properties:
 *       patientTitleId:
 *         type: integer
 *         description: patient's title id
 *         minimum: 1
 *       firstName:
 *         type: string
 *         description: patient's first name
 *       middleName:
 *          type: string
 *          description: patient's middle name
 *       lastName:
 *          type: string
 *          description: patient's last name
 *       gender:
 *          type: string
 *          description: gender of the patient
 *       dateOfBirth:
 *          type: string
 *          description: patient's birth date
 *       nationality:
 *          type: string
 *          description: patient's nationality
 *       age:
 *          type: integer
 *          description: patient's age
 *          minimum: 0
 *       active:
 *          type: boolean
 *          description: if the patient' with doctor he-she is active = true default 0
 *       regDate:
 *          type: boolean
 *          description: the patient's registration date default server side registration date
 *       contact:
 *          type: object
 *          $ref: '#/definitions/Contact'
 *       address:
 *          type: object
 *          $ref: '#/definitions/Address'
 *       emergencyInfo:
 *          type: object
 *          $ref: '#/definitions/EmergencyInfo'
 *
 */


/**
 * @swagger
 * /patient:
 *  get:
 *    description: get all patients
 *    tags:
 *      - patient
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: all or empty list of patients
 */
router.get('/', patientsController.getAllPatients);


/**
 * @swagger
 * /patient/byIdPartial/{patientId}:
 *  get:
 *    description: get only the primary info of patient (no contact,no address, no emergency info)
 *    tags:
 *      - patient
 *    parameters:
 *      - name: patientId
 *        description: the id of the patient
 *        required: true
 *        type: integer
 *        in: path
 *        schema:
 *          minimum: 1
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: partial information about patient
 */
router.get('/byIdPartial/:patientId', patientsController.getPatientByIdPartial);

/**
 * @swagger
 * /patient/byIdFull/{patientId}:
 *  get:
 *    description: get all the patient's information by id (including address, contact, emergency info)
 *    tags:
 *      - patient
 *    parameters:
 *      - name: patientId
 *        description: the id of the patient
 *        required: true
 *        type: integer
 *        in: path
 *        schema:
 *          minimum: 1
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: full information about patient
 */
router.get('/byIdFull/:patientId', patientsController.getPatientByIdFull);

/**
 * @swagger
 * /patient/byName/{firstName}/{phoneNumber}:
 *  get:
 *    description: get patients by first name or phone number
 *    tags:
 *      - patient
 *    parameters:
 *      - name: firstName
 *        description: the first name to search with
 *        required: true
 *        type: string
 *        in: path
 *      - name: phoneNumber
 *        description: patient's phone number
 *        required: true
 *        type: string
 *        in: path
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: list of patients matching first name and phone number
 */
router.get('/forgetId/:firstName/:pn', patientsController.getPatientByNameAndPn);

/**
 * @swagger
 * /patient:
 *  post:
 *    description: save new patient
 *    tags:
 *      - patient
 *    produces:
 *      -application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Patient'
 *    responses:
 *      201:
 *        description: patient is saved
 */
router.post('/', patientsController.saveNewPatient);

/**
 * @swagger
 * /patient/{patientId}/{addressId}/{contactId}/{emergencyInfoId}:
 *  delete:
 *    description: delete patient and related info
 *    tags:
 *      - patient
 *    produces:
 *      -application/json
 *    parameters:
 *       - name: patientId
 *         description: the id of the patient to delete
 *         required: true
 *         in: path
 *         schema:
 *            type: integer
 *            minimum: 1
 *       - name: addressId
 *         description: patient's address info id
 *         required: true
 *         in: path
 *         schema:
 *            type: integer
 *            minimum: 1
 *       - name: contactId
 *         description: patient's contact info id
 *         required: true
 *         in: path
 *         schema:
 *            type: integer
 *            minimum: 1
 *       - name: emergencyInfoId
 *         description: patient's emergency info id
 *         required: true
 *         in: path
 *         schema:
 *            type: integer
 *            minimum: 1
 *    responses:
 *      204:
 *        description: patient is deleted
 *      404:
 *         description: patient doesn't exist
 */
router.delete('/:patientId/:addressId/:contactId/:emergencyInfoId', patientsController.deleteByPatientId);


/**
 * @swagger
 * /patient/{patientId}:
 *  put:
 *    description: update a patient
 *    tags:
 *      - patient
 *    parameters:
 *       - name: patientId
 *         description: the id of the patient to update
 *         required: true
 *         type: integer
 *         in: path
 *    produces:
 *      -application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/Patient'
 *    responses:
 *      200:
 *        description: patient is updated
 */
router.put('/:patientId', patientsController.updatePatientById);


/**
 * @swagger
 * /patient/contactInfo/{contactId}:
 *  get:
 *    description: get patient's contact info with contact id
 *    tags:
 *      - patient
 *    parameters:
 *      - name: contactId
 *        description: the id of the contact
 *        required: true
 *        type: string
 *        in: path
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: patient's contact info
 */
router.get('/contactInfo/:contactId', patientsController.getContactById);

/**
 * @swagger
 * /patient/address/{addressId}:
 *  get:
 *    description: get patient's address info with address id
 *    tags:
 *      - patient
 *    parameters:
 *      - name: addressId
 *        description: the id of the address info
 *        required: true
 *        type: string
 *        in: path
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: patient's address info
 */
router.get('/address/:addressId', patientsController.getAddressById);

/**
 * @swagger
 * /patient/emergencyInfo/{emergencyInfoId}:
 *  get:
 *    description: get patient's emergency info with emergency id
 *    tags:
 *      - patient
 *    parameters:
 *      - name: emergencyInfoId
 *        description: the id of the emergency info
 *        required: true
 *        type: string
 *        in: path
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: patient's emergency info
 */
router.get('/emergencyInfo/:emergencyInfoId', patientsController.getEmergencyInfoById);

module.exports = router;
