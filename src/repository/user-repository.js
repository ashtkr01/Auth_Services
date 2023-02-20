const { User , Role} = require('../models/index');
const ValidationError = require('../utils/validation-error');

const ClientError = require('../utils/client-error');

const  { StatusCodes }  = require('http-status-codes');

class UserRepository{
    //Create:
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                let validationError = new ValidationError(error);
                throw validationError;
            }
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }
    //Destroy:
    async destroy(userId){
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }
    //Get
    async getById(userId){
        try {
            const user = await User.findByPk(userId , {
                attributes : ['email','id']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in repository Layer");
            throw error;
        }
    }
    //Get:
    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where : {
                    email : userEmail
                }
            });
            if(!user){
                throw new ClientError(
                    'EmailNotFound',
                    'Invalid email sent in the request',
                    'Please check the email as there is no record of the email',
                    StatusCodes.NOT_FOUND
                );
            }
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }
    //isAdmin:
    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            // console.log("UserId",userId);
            console.log(user);
            console.log(adminRole);
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }

}

module.exports = UserRepository;