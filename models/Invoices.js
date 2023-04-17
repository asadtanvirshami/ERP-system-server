module.exports = (sequelize, DataTypes) => {
  const Invoices = sequelize.define("Invoices", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ammount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Invoices;
};
