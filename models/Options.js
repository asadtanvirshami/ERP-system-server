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
        resources:{
            type:DataTypes.JSON,
            allowNull: true, 
        },
        countries:{
            type:DataTypes.JSON,
            allowNull: true,  
        },
        job_type:{
            type:DataTypes.JSON,
            allowNull: true,  
        },
        job_status:{
            type:DataTypes.JSON,
            allowNull: true,  
        },
        job_roles:{
            type:DataTypes.JSON,
            allowNull: true,  
        },
    });


    return Options ;
};