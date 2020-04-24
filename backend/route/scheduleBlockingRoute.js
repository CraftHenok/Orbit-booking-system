const express = require("express");
const scheduleBlockingController = require("../controller/scheduleBlockingController.js");
const router = express.Router();

/**
 * @swagger
 * /scheduleBlocking:
 *  get:
 *    description: get doctor schedule blocking using token
 *    tags:
 *      - schedule Blocking
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: doctor's list of schedule Blocking
 */
router.get("/", scheduleBlockingController.getDoctorsScheduleBlockingByToken);


/**
 * @swagger
 * /scheduleBlocking/{doctorId}:
 *  get:
 *    description: get schedule blocking by doctor id
 *    tags:
 *      - schedule Blocking
 *    parameters:
 *       - name: doctorId
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
 *        description: list of schedule blocking based on doctor id
 */
router.get("/:id", scheduleBlockingController.getDoctorsScheduleBlockingById);

/**
 * @swagger
 * /scheduleBlocking:
 *  post:
 *    description: save new schedule Blocking
 *    tags:
 *      - schedule Blocking
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                startDate:
 *                  type: string
 *                  description: the schedule blocking start date
 *                endDate:
 *                  type: string
 *                  description: the schedule blocking end date
 *                userId:
 *                  type: integer
 *                  description: the id of the user
 *                reason:
 *                  type: string
 *                  description: reason for the blocking
 *    produces:
 *      -application/json
 *    responses:
 *      201:
 *        description: the schedule blocking is saved
 */
router.post("/", scheduleBlockingController.saveNewScheduleBlocking);


/**
 * @swagger
 * /scheduleBlocking/{scheduleBlockingId}:
 *  delete:
 *    description: delete schedule Blocking
 *    tags:
 *      - schedule Blocking
 *    parameters:
 *      - name: scheduleBlockingId
 *        description: the schedule Blocking id to delete
 *        required: true
 *        type: integer
 *        in: path
 *    produces:
 *      -application/json
 *    responses:
 *      204:
 *        description: number of rows affected in schedule Blocking
 */
router.delete("/:id", scheduleBlockingController.deleteScheduleBlocking);

/**
 * @swagger
 * /scheduleBlocking/{scheduleBlockingId}:
 *  put:
 *    description: update schedule Blocking
 *    tags:
 *      - schedule Blocking
 *    parameters:
 *      - name: scheduleBlockingId
 *        description: the schedule Blocking's id to delete
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
 *                startDate:
 *                  type: string
 *                  description: the schedule blocking start date
 *                endDate:
 *                  type: string
 *                  description: the schedule blocking end date
 *                userId:
 *                  type: integer
 *                  description: the id of the user
 *                reason:
 *                  type: string
 *                  description: reason for the blocking
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: number of rows affected in schedule Blocking
 */
router.put("/:id", scheduleBlockingController.updateScheduleBlocking);

module.exports = router;
