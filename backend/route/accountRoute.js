const express = require("express");
const accountController = require("../controller/accountController");
const router = express.Router();

/**
 * @swagger
 * /account/login:
 *  post:
 *    description: login a user
 *    tags:
 *      - account
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: password
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: the user with token added
 */
router.post('/login', accountController.login);


/**
 * @swagger
 * /account/register:
 *  post:
 *    description: register a new user
 *    tags:
 *      - account
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: password
 *              role:
 *                type: string
 *                description: the role of the user it can be D(for doctor) or R(for reception)
 *                minimum: 1
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: successful user registration
 */
router.post('/register', accountController.register);

module.exports = router;
