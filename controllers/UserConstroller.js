
module.exports = class UserController{
    static async register (req, res, next){
        try {
            const {email, password} = req.body
            const user = await User.create({email,password})
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (error) {
            next(error)
        }
    }
}