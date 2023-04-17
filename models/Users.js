module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        fullname:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        company:{
            type:DataTypes.STRING,
            allowNull: true,
        },
        phone:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        type:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        role:{
            type:DataTypes.STRING,
            allowNull: true,
        },
        signature:{
            type:DataTypes.STRING,
            allowNull: true,
        }
    })
    return Users
}