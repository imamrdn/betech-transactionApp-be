const { verify } = require("../helpers/Jwt");
const Models = require("../models/index");

async function authentication(req, res, next) {
  try {
    const authHeader = req.get("x-access-token");
    if (!authHeader) {
      return res.status(401).json({ message: "You are not authenticated" });
    }

    const decoded = verify(authHeader);
    const user = await Models.User.findOne({
      where: { id: decoded.id },
      attributes: ["id", "email"],
    });

    if (!user) {
      return res.status(403).json({ message: "Token is not valid!" });
    }

    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ message: `${err.message}. Please try again` });
  }
}

module.exports = authentication;
