const { DataTypes } = require('sequelize');

const {Company, Options } = require("../../models/");

// ============================  SALES  TO AGENTS ASSOCIATIONS ============================ //

Company.hasMany(Options,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Options.belongsTo(Company);


module.exports = {Company, Options }