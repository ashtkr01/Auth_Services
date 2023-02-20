const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const { JWT_KEY } = require('../config/serverConfig');

const UserRepository = require('../repository/user-repository');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }
    //Create:
    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Error is ",error);
            if(error.name == 'SequelizeValidationError'){
                throw error;
            }
            console.log("Somethong went wrong in service layer");
            throw error;
        }
    }
    //Sign in:
    async signIn(email , plainPassword){
        try {
            //Step-1:
            const user = await this.userRepository.getByEmail(email);
            //Step 2:
            const passwordMatch = this.checkPassword(plainPassword , user.password);

            if(!passwordMatch){
                console.log("Password doesn't match");
                throw {error : 'Incorrect Password'};
            }
            //Step 4: If password matches then we have to create the token: with given property
            const newJWT = this.createToken({email : user.email , password : user.password , id : user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in SignIn");
            throw error;
        }
    }
    //IsAuthenticated:
    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error: "Invalid Token"};
            }
            const user = await this.userRepository.getById(response.id);
            // const user = await this.userRepository.getByEmail(response.email);
            console.log(response);
            console.log(response.id);
            if(!user){
                throw {error: 'No user with corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in isAuthenticated Service");
            throw error;
        }
    }
    //Generate Tokens:
    createToken(user) {
        try {
            const result = jwt.sign(user , JWT_KEY , {expiresIn : '1h'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token Creation");
            throw error;
        }
    }

    //Verify:
    verifyToken(token) {
        try {
            const response = jwt.verify(token , JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in Token Verification ", error);
            throw error;
        }
    }

    //Check Password: 
    checkPassword(userInputPlainPassword , encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword , encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in Checking Password");
            throw error;
        }
    }

    //Isadmin:
    async isAdmin(userId){
        try {
            return await this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in isAdmin");
            throw error;
        }
    }
}

module.exports = UserService;