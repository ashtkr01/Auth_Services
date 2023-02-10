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

//Is Authenticate:
const isAuthenticated = async (req , res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            message: "Authenticated",
            err: {},
            success: true
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
//IsAdmin:
const isAdmin = async(req , res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully fetched whether user is admin or not',
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
    signIn , 
    isAuthenticated ,
    isAdmin
}