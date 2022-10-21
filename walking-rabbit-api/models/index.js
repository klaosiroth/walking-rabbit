const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('database_test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(Sequelize, DataTypes);

// db.sequelize.sync({ force: true });

// app.js
// require('./models')
// const db = require('./models')
