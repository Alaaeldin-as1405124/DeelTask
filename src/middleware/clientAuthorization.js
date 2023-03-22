const { ProfileType } = require("../enums/enums");

const clientAuthorization = async (req, res, next) => {
  const { Profile } = req.app.get("models");
  const profile = await Profile.findOne({
    where: { id: req.get("profile_id") || 0 },
  });
  if (
    !profile ||
    !profile.dataValues ||
    profile.dataValues.type !== ProfileType.CLIENT
  )
    return res.status(401).json({ error: "Unauthorized access" }).end();
  req.profile = profile;
  next();
};
module.exports = { clientAuthorization };
