const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ourleague','root',null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connect thanh cong');
    } catch (error) {
        console.error('Connect that bai: ', error);
    }
}

export default connectDatabase