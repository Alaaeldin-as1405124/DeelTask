const express = require("express");
const router = express.Router();
const service = require("../services/contracts.service");
const { getProfile } = require("../middleware/getProfile");

/**
 * @swagger
 * tags:
 *   name: Contracts
 *   description: APIs for to get some summary information
 * /contracts/:
 *   get:
 *     summary: Get none terminated contracts
 *     description: API which is get none terminated contracts, based on the profile
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: profile_id
 *         required: true
 *         description: Profile ID
 *     responses:
 *       '200':
 *         description: successful response
 */
router.route("/").get(getProfile, service.getContracts);

/**
 * @swagger
 * /contracts/{id}:
 *   get:
 *     summary: Get a certain contract
 *     description: API which is getting contract by contract id
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: profile_id
 *         required: true
 *         description: Profile ID
 *       - in: path
 *         name: id
 *         schema:
 *            type: integer
 *         required: true
 *         description: Numeric ID of the contract id
 *     responses:
 *       '200':
 *         description: successful response
 */
router.route("/:id").get(getProfile, service.getContract);

module.exports = router;
