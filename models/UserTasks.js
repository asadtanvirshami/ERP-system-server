module.exports = (sequelize, DataTypes) => {
    const UserTasks = sequelize.define("UserTasks", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
    return UserTasks;
  };
  