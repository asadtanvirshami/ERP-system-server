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
        profile_pic:{
            type:DataTypes.STRING
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
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
        designation:{
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