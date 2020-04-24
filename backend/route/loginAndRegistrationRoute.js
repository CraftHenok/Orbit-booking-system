const express = require("express");
const loginAndRegistrationController = require("../controller/loginAndRegistrationController");
const router = express.Router();

/**
 * @swagger
 * /account/login:
 *  post:
 *    description: login a user and return a token
 *    tags:
 *      - loginAndRegistration
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
 *      201:
 *        description: the user with token added
 */
router.post('/login', loginAndRegistrationController.login);


/**
 * @swagger
 * /account/register:
 *  post:
 *    description: register a new user
 *    tags:
 *      - loginAndRegistration
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *                description: unique email
 *              password:
 *                type: string
 *              status:
 *                type: string
 *                description: A(for approved), S(for suspended), P(for pending)
 *              role:
 *                type: string
 *                description: the role of the user it can be D(for doctor) or R(for reception),A(for admin)
 *                minimum: 1
 *    produces:
 *      -application/json
 *    responses:
 *      201:
 *        description: successful user registration
 */
router.post('/register', loginAndRegistrationController.register);

module.exports = router;
