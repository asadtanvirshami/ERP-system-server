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
        type: DataTypes.STRING,
        allowNull: false,
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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      start_time: {
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
      created_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_amount_txt: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      amount_paid: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      amount_left: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    });
    return Sales;
  };
  