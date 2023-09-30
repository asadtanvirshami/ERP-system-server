const { DataTypes } = require('sequelize');

const { Sales, Invoices,Users } = require("../../models");

// ============================  SALES  TO AGENTS ASSOCIATIONS ============================ //

Sales.hasOne(Invoices,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Invoices.belongsTo(Sales);

Users.hasMany(Sales, {
    foriegnKey: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
  Sales.belongsTo(Users);

  


module.exports = {Sales,Invoices,Users }