const express = require("express");
const accountManagerController = require("../controller/accountManagerController");
const router = express.Router();

/**
 * @swagger
 * /accountManager:
 *  get:
 *    description: get user profile info by token
 *    tags:
 *      - accountManager
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: user profile information is returned
 */
router.get('/', accountManagerController.getAccountInfoByToken);

/**
 * @swagger
 * /accountManager/{userId}:
 *  get:
 *    description: get user profile info by id
 *    tags:
 *      - accountManager
 *    parameters:
 *      - name: userId
 *        description: the id of the user
 *        required: true
 *        type: integer
 *        in: path
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: user profile information is returned
 */
router.get('/:id', accountManagerController.getAccountInfoById);


/**
 * @swagger
 * /accountManager/:
 *  put:
 *    description: update user profile info using token
 *    tags:
 *      - accountManager
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                email:
 *                  type: string
 *                  description: unique email
 *                password:
 *                  type: string
 *                status:
 *                  type: string
 *                  description: A(for approved), S(for suspended), P(for pending)
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: user profile info is updated
 */
router.put('/', accountManagerController.updateAccountInfoByToken);


/**
 * @swagger
 * /accountManager/{userId}:
 *  put:
 *    description: update user profile info using id
 *    tags:
 *      - accountManager
 *    parameters:
 *      - name: userId
 *        description: the id of the user
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
 *                username:
 *                  type: string
 *                email:
 *                  type: string
 *                  description: unique email
 *                password:
 *                  type: string
 *                status:
 *                  type: string
 *                  description: A(for approved), S(for suspended), P(for pending)
 *    produces:
 *      -application/json
 *    responses:
 *      200:
 *        description: user profile info is updated
 */
router.put('/:id', accountManagerController.updateAccountInfoById);

/**
 * @swagger
 * /accountManager/{userId}:
 *  delete:
 *    description: delete user profile
 *    tags:
 *      - accountManager
 *    parameters:
 *      - name: userId
 *        description: the id of the user
 *        required: true
 *        type: integer
 *        in: path
 *    produces:
 *      -application/json
 *    responses:
 *      204:
 *        description: number of rows affected in user table
 */
router.delete('/:id', accountManagerController.deleteAccount);


module.exports = router;
