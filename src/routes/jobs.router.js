const express = require("express");
const router = express.Router();
const service = require("../services/jobs.service");
const { getProfile } = require("../middleware/getProfile");
const { clientAuthorization } = require("../middleware/clientAuthorization");

//get unpaid jobs, based on the profile

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: APIs for to get Job information
 * /jobs/unpaid:
 *   get:
 *     summary: Get unpaid jobs
 *     description: API which is getting unpaid jobs, based on the profile
 *     tags: [Jobs]
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
router.route("/unpaid").get(getProfile, service.getUnPaidJobs);

/**
 * @swagger
 * /jobs/{job_id}/pay:
 *   post:
 *     summary: Pay for a certain job
 *     description: API which is getting paying for a certain job.
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: profile_id
 *         required: true
 *         description: Profile ID
 *       - in: path
 *         name: job_id
 *         schema:
 *            type: integer
 *         required: true
 *         description: Numeric ID of the job id
 *     responses:
 *       '200':
 *         description: successful response
 */
router.route("/:job_id/pay").post(clientAuthorization, service.pay);

module.exports = router;
