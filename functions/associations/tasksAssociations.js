const { DataTypes } = require('sequelize');

const { Tasks, Users } = require("../../models");

// ============================  SALES  TO AGENTS ASSOCIATIONS ============================ //

Tasks.hasMany(Users,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Users.hasMany(Tasks);

module.exports = {Tasks,Users }