const express = require("express");
const scheduleBlockingController = require("../controller/scheduleBlockingController.js");
const router = express.Router();

/**
 * @swagger
 * /scheduleBlocking:
 *  get:
 *    description: get schedule blocking by doctor id
 *    tags:
 *      - schedule Blocking
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: loged in doctor list of schedule Blocking
 */
router.get("/", scheduleBlockingController.getDoctorsScheduleBlocking);

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
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: new schedule blocking is saved
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
 *      - name: schedule Blocking Id
 *        description: the schedule Blocking id to delete
 *        required: true
 *        type: integer
 *        in: path
 *    produces:
 *      -application/json
 *    responses:
 *      200:
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
 *      - name: emergencyTitleId
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
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: number of rows affected in schedule Blocking
 */
router.put("/:id", scheduleBlockingController.updateScheduleBlocking);

module.exports = router;
