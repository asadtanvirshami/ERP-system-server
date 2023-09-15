module.exports = (sequelize, DataTypes) => {
const Options = sequelize.define("Options", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        sources:{
            type:DataTypes.JSON,
            allowNull: true,
        },
        status:{
            type:DataTypes.JSON,
            allowNull: true,  
        },
        designation:{
            type:DataTypes.JSON,
            allowNull: true,  
        },
        services:{
            type:DataTypes.JSON,
            allowNull: true,  
        },
    });


    return Options ;
};