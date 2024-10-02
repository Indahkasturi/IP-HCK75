const {User} = require('../models/')
const { compareHashed } = require("../helper/hash");
const { signToken } = require("../helper/jwt");

module.exports = class UserController{
    static async register (req, res, next){
        try {
            const {email, password, role} = req.body
            const user = await User.create({email, password, role})
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (error) {
            next(error)
        }
    }


    static async login (req, res, next){
        try {
            const {email, password} = req.body
            if (!email){
                throw {name: "BadRequest", message: "Email is required"}
            }
            if(password){
                throw{name: "BadRequest", message: "Password is required"}
            }
            const user = await User.findOne({where: {email}})
            if (!user){
                throw {
                    name: "Unauthorized",
                    message: "error invalid email or password",
                  };
            }
            const isValidPassword = compareHashed(password, user.password);
            if (!isValidPassword) {
              throw {
                name: "Unauthorized",
                message: "Error invalid email or password",
              };
            }
      
            const access_token = signToken({ id: user.id });
            res.status(200).json({ access_token });
        } catch (error) {
            next(error)
        }
    }

}