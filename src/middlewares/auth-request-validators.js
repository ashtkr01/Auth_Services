const validateUserAuth = (req , res , next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong in validateUserAuth',
            err: 'Email or Password is missing'
        });
    }
    next();
}

const isValidAdminRequest = (req , res , next) => {
    if(!req.body.id){
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Something went wrong in isValidAdminRequest',
            err: 'Id is not given'
        });
    }
    next();
}

module.exports = {
    validateUserAuth , 
    isValidAdminRequest
}