const { DataTypes } = require('sequelize');

const { Tasks, Users, Company, UsersTask } = require("../../models");

// ============================  SALES  TO AGENTS ASSOCIATIONS ============================ //

Users.hasMany(Tasks,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
Tasks.belongsTo(Users);

Company.hasMany(Tasks,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
Tasks.belongsTo(Company);

Tasks.belongsToMany(Users, { through: 'UserTask' });
Users.belongsToMany(Tasks, { through: 'UserTask' });

module.exports = {Tasks,Users, Company }