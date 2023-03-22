const repo = require("../repositories/balance.repo");

class BalanceService {
  async depositBalance(req, res) {
    try {
      const profile = req.profile;
      const depositAmount = req.body.amount;
      
      if (!depositAmount || depositAmount <= 0) {
        return res
          .status(400)
          .json({ error: "Amount should be greater than 0" });
      }
      const response = await repo.depositBalance(profile, depositAmount);

      return res.json(response);
    } catch (err) {
      return res.status(500).json({ error: err.toString() });
    }
  }
}

module.exports = new BalanceService();
