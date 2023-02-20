const  { statusCodes }  = require('http-status-codes');

class AppErrors extends Error{
    constructor(
        name = 'AppErrors',
        message = 'Something went wrong',
        explanation = 'Something went wrong',
        statusCode = statusCodes.INTERNAL_SERVER_ERROR
    ){
        super();
       this.message = message,
       this.name = name,
       this.statusCode = statusCode,
       this.explanation = explanation 
    }
}

module.exports = AppErrors;