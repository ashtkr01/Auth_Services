const { User } = require('../models/index');

class UserRepository{
    //Create:
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
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
}

module.exports = UserRepository;