const express = require("express");
const router = express.Router();
const service = require("../services/balance.service");
const { getProfile } = require("../middleware/getProfile");

/**
 * @swagger
 * tags:
 *   name: Balance
 *   description: APIs for managing user balance
 *
 * /balances/deposit:
 *   post:
 *     summary: Deposit balance
 *     description: Deposit balance to user account
 *     tags: [Balance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: profile_id
 *         required: true
 *         description: Profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 100
 *     responses:
 *       '200':
 *         description: Balance successfully deposited
 */
router.route("/deposit").post(getProfile, service.depositBalance);

module.exports = router;
