const express = require("express");
const router = express.Router();
const service = require("../services/admin.service");
const { adminAuthorization } = require("../middleware/adminAuthorization");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: APIs for to get some summary information
 * /admin/best-profession:
 *   get:
 *     summary: Get the best professions
 *     description: API which is getting the best professions who earned the most money
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: profile_id
 *         required: true
 *         description: Profile ID
 *       - in: query
 *         name: start
 *         required: true
 *         schema:
 *           type: string
 *         description: The start date of your query
 *       - in: query
 *         name: end
 *         required: true
 *         schema:
 *           type: string
 *         description: The end date of your query
 *     responses:
 *       '200':
 *         description: successful response
 */
router
  .route("/best-profession")
  .get(adminAuthorization, service.getBestProfessions);

/**
 * @swagger
 * /admin/best-clients:
 *   get:
 *     summary: Get the best clients
 *     description: Returns the best clients, who earned the most money
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: profile_id
 *         required: true
 *         description: Profile ID
 *       - in: query
 *         name: start
 *         required: true
 *         schema:
 *           type: string
 *         description: The start date of your query
 *       - in: query
 *         name: end
 *         required: true
 *         schema:
 *           type: string
 *         description: The end date of your query
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *         description: The limit of the response query (Optional) 2 by default if not provided
 *     responses:
 *       '200':
 *         description: successful response
 */
router.route("/best-clients").get(adminAuthorization, service.getBestClients);

module.exports = router;
