const { DataTypes } = require("sequelize");

const { Tasks, Users, Company, UserTask } = require("../../models");
// ============================  SALES  TO AGENTS ASSOCIATIONS ============================ //

Users.hasMany(Tasks, {
  foriegnKey: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
Tasks.belongsTo(Users);

Company.hasMany(Tasks, {
  foriegnKey: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});
Tasks.belongsTo(Company);



module.exports = { Tasks, Users, Company, UserTask };
