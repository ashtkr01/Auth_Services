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
}

module.exports = UserRepository;