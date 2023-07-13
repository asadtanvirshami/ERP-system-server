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

// Tasks.belongsToMany(Users, { through: "UserTask" });
// Users.belongsToMany(Tasks, { through: "UserTask" });

// Tasks.belongsToMany(Users, {through: {
//   model: UserTask,
//   unique: false,
//   foriegnKey:'UserId'
// }});
// Users.belongsToMany(Tasks, { through: {
//   model: UserTask,
//   unique: false,
//   foriegnKey:'TaskId'
// }});


module.exports = { Tasks, Users, Company, UserTask };
