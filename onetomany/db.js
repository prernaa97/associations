import { Sequelize } from "sequelize"

const sequelize = new Sequelize('onetomany','root','0410',{
    host : 'localhost',
    dialect : 'mysql'
});

export default sequelize;