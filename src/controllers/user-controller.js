const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req , res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully created ",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Something wrong in controllers",
            err: error,
            success: false
        });
    }
}

//SignIN:
const signIn = async (req , res) => {
    try {
        const response = await userService.signIn(req.body.email , req.body.password);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully sign in our page",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            message: "Something wrong in controllers",
            err: error,
            success: false
        });
    }
}

module.exports = {
    create , 
    signIn
}