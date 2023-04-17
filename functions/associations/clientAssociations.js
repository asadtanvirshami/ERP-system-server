const { DataTypes } = require('sequelize');

const { Agents, Sales, Clients } = require("../../models/");

// ============================  SALES  TO AGENTS ASSOCIATIONS ============================ //

Clients.hasMany(Sales,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Sales.belongsTo(Clients);

module.exports = { Agents,Sales,Clients}