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
      service: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      source_link: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pay_method: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      created_time: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      created_month: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      created_date: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      total_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_amount_txt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      source_username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
    return Sales;
  };
  