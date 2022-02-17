module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      splash: {
        type: Sequelize.BIGINT
      },
      fabTech: {
        type: Sequelize.BOOLEAN
      },
      mill: {
        type: Sequelize.BOOLEAN
      },
      lathe: {
        type: Sequelize.BOOLEAN
      },
      waterjet: {
        type: Sequelize.BOOLEAN
      },
      wood1: {
        type: Sequelize.BOOLEAN
      },
      wood2: {
        type: Sequelize.BOOLEAN
      },
      metal1: {
        type: Sequelize.BOOLEAN
      },
      metal2: {
        type: Sequelize.BOOLEAN
      },
      
    });
    return User;
  };