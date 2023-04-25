const { DataTypes } = require('sequelize');

const {Company, Users, Sales, Invoices, Clients } = require("../../models/");

// ============================ AGENT, SALES, Invoices, Clients & USERS TO COMPANY ASSOCIATIONS ============================ //

Users.hasMany(Company,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Company.belongsTo(Users);

Company.hasMany(Users,{
    foriegnKey:{
        type: DataTypes.INTEGER
    }
});
Users.belongsTo(Company);

Company.hasMany(Sales,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
Sales.belongsTo(Company);

Company.hasMany(Invoices,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
Invoices.belongsTo(Company);

Company.hasMany(Clients,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
Clients.belongsTo(Company);

module.exports = {Company, Users, Sales, Invoices, Clients}