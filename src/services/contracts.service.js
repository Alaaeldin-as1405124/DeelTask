const repo = require("../repositories/contracts.repo");

class ContractsService {
  async getContract(req, res) {
    try {
      const id = req.params.id;
      console.log("🚀 ~ file: contracts.service.js:7 ~ ContractsService ~ getContract ~ id:", id)
      const profile = req.profile;
      const response = await repo.getContractById(profile, id);
      if (!response) {
        return res.status(404).json({ error: "Resource is not found" });
      }
      return res.json(response);
    } catch (err) {
      return res.status(500).json({ error: err?.toString() });
    }
  }

  async getContracts(req, res) {
    try {
      const profile = req.profile;
      const response = await repo.getContracts(profile);
      if (!response) {
        return res.status(404).json({ error: "Resource is not found" });
      }
      return res.json(response);
    } catch (err) {
      return res.status(500).json({ error: err?.toString() });
    }
  }
}

module.exports = new ContractsService();
