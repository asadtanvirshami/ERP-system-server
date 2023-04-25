module.exports = (sequelize, DataTypes) => {
    const Sales = sequelize.define("Sales", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true
      },
      startDate: {
        type: DataTypes.STRING,
        allowNull: true
      },
      endDate: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdBy:{
        type: DataTypes.STRING,
        allowNull: true
      },
      assignedTo:{
        type: DataTypes.STRING,
        allowNull: true
      }
    });
    return Sales;
  };
  