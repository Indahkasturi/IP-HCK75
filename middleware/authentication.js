const { User } = require("../models");
const { verifyToken } = require("../helper/jwt");

module.exports = async function authentication(req, res, next) {
  try {
    const bearerToken = req.headers["authorization"];
    // console.log(req.headers)
    if (!bearerToken) {
      next({ name: "Unauthorized", message: "Invalid Token" });
      return;
    }
    const [, token] = bearerToken.split(" ");
    if (!token) {
      next({ name: "Unauthorized", message: "Invalid Token" });
      return;
    }
    const data = verifyToken(token);
    const user = await User.findByPk(data.id);
    if(!user){
        next({name:"Unauthorized", message: "Invalid Token"})
        return
    }
    req.user = {
      id: user.id,
      role: user.role
    }
    next()
  } catch (error) {
    next(error)
  }
};
