import { Sequelize } from "sequelize";

const sequelize =new Sequelize ('test1','root','0410',{
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;

