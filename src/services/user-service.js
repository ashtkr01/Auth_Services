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
            console.log("Somethong went wrong in service repository");
            throw error;
        }
    }
}

module.exports = UserService;