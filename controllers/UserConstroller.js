const {User} = require('../models/')
const { compareHashed } = require("../helper/hash");
const { signToken } = require("../helper/jwt");
// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client()

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
            if(!password){
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
    // static async googleLogin (req, res, next){
    //     const ticket = await client.verifyIdToken({
    //         idToken: googleToken,
    //         audience: process.env.GOOGLE_CLIENT_ID,

    //     });
    //     const data = ticket.getPayload();
    //     const [user, created] = await User.findOrCreate({
    //         where: { email: data.email },
    //         defaults: {
    //             username: data.name,
    //             email: data.email,
    //             picture: data.picture,
    //             provider: 'google',
    //             password: 'google_id'
    //         },
    //         hooks: false
    //     });

    //     const token = signToken({ id: user.id }, process.env.JWT_SECRET);
    //     res.status(created ? 201 : 200).json({ access_token: token });
    //     try {
    //     } catch (error) {
            
    //     }
    // }

}