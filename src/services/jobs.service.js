const repo = require("../repositories/jobs.repo");

class JobsService {
  async getUnPaidJobs(req, res) {
    try {
      const profile = req.profile;
      const response = await repo.getUnPaidJobs(profile);
      if (!response) {
        return res.status(404).json({ error: "Resource is not found" });
      }
      return res.json(response);
    } catch (err) {
      return res.status(500).json({ error: err?.toString() });
    }
  }

  async pay(req, res) {
    try {
      const profile = req.profile;
      const jobId = req.params.job_id;
      const response = await repo.pay(profile, jobId);
      if (!response) {
        return res.status(404).json({ error: "Resource is not found" });
      }
      return res.json(response);
    } catch (err) {
      return res.status(500).json({ error: err?.toString() });
    }
  }
}

module.exports = new JobsService();
