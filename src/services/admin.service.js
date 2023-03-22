const repo = require("../repositories/admins.repo");

class AdminsService {
  async getBestProfessions(req, res) {
    const { start, end } = req.query;
    try {
      const startDate = new Date(start);
      const endDate = new Date(end);

      // Parse and validate start date
      if (isNaN(startDate.getTime())) {
        return res.status(400).json({ error: "Invalid start date" });
      }

      // Parse and validate end date
      if (isNaN(endDate.getTime())) {
        return res.status(400).json({ error: "Invalid end date" });
      }
      // Check if start date is before end date
      if (startDate > endDate) {
        return res
          .status(400)
          .json({ error: "Start date must be before end date" });
      }

      const response = await repo.getBestProfessions(startDate, endDate);
      if (!response) {
        return res.status(404).json({ error: "Resource is not found" });
      }
      return res.json(response);
    } catch (err) {
      return res.status(500).json({ error: err?.toString() });
    }
  }

  async getBestClients(req, res) {
    const { start, end, limit } = req.query;
    try {
      const startDate = new Date(start);
      const endDate = new Date(end);

      // Parse and validate start date
      if (isNaN(startDate.getTime())) {
        return res.status(400).json({ error: "Invalid start date" });
      }

      // Parse and validate end date
      if (isNaN(endDate.getTime())) {
        return res.status(400).json({ error: "Invalid end date" });
      }
      // Check if start date is before end date
      if (startDate > endDate) {
        return res
          .status(400)
          .json({ error: "Start date must be before end date" });
      }

      //Validate the limit
      if (limit && limit <= 0) {
        //if there's limit defined, it should be more than 0
        return res.status(400).json({ error: "Limit must be greater than 0" });
      }
      const response = await repo.getBestClients(startDate, endDate, limit);
      if (!response) {
        return res.status(404).json({ error: "Resource is not found" });
      }
      return res.json(response);
    } catch (err) {
      return res.status(500).json({ error: err?.toString() });
    }
  }
}

module.exports = new AdminsService();
