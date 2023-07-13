const { DataTypes } = require('sequelize');

const { Tasks, Users, Company,UserTasks } = require("../../models");

// ============================  UserTasks  TO Company, Users & Tasks ASSOCIATIONS ============================ //

Users.hasMany(UserTasks,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
UserTasks.belongsTo(Users);

Company.hasMany(UserTasks,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
UserTasks.belongsTo(Company);

Tasks.hasMany(UserTasks,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
UserTasks.belongsTo(Tasks);

module.exports = {Tasks,Users, Company,UserTasks }