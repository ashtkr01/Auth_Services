const express = require('express');
const bodyParser = require('body-parser');

const db = require('./models/index');

const  { User , Role } = require('./models/index');


const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');



// const UserRepository = require('./repository/user-repository');

const app = express();

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api',apiRoutes);
    
    app.listen(PORT , async () => {
        console.log(`Server Started at Port ${PORT}`);

        // const u1 = await User.findByPk(2);
        // const r1 = await Role.findByPk(2);


        // //Add:
        // // await u1.addRole(r1);

        // const response = await u1.hasRole(r1);
        // console.log(response);

        // if(process.env.DB_SYNC){
        //     db.sequelize.sync({alter: true});
        // }
    });
}

//Call:
prepareAndStartServer();