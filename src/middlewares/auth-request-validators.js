const validateUserAuth = (req , res , next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data: {},
            success: false,
            message: 'Somethin went wrong in validateUserAuth',
            err: 'Email or Password is missing'
        });
    }
    next();
}

module.exports = {
    validateUserAuth
}