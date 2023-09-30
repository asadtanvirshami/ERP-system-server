const { DataTypes } = require('sequelize');

const {Sales, Invoices, Clients } = require("../../models/");

// ============================  SALES  TO AGENTS ASSOCIATIONS ============================ //

Invoices.hasMany(Sales,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Sales.belongsTo(Invoices);

Clients.hasMany(Invoices,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Invoices.belongsTo(Clients);

module.exports = {Sales,Invoices, Clients }