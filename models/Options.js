module.exports = (sequelize, DataTypes) => {
    const Types = sequelize.define("Types", {
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
            type:DataTypes.STRING,
            allowNull: true,
        },
        resources:{
            type:DataTypes.STRING,
            allowNull: true, 
        },
        countries:{
            type:DataTypes.STRING,
            allowNull: true,  
        },
        job_type:{
            type:DataTypes.STRING,
            allowNull: true,  
        },
        job_status:{
            type:DataTypes.STRING,
            allowNull: true,  
        },
        job_roles:{
            type:DataTypes.STRING,
            allowNull: true,  
        },
    });


    return Types ;
};