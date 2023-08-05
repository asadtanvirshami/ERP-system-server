module.exports = (sequelize, DataTypes) => {
    const Clients = sequelize.define("Clients", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        address:{
            type:DataTypes.STRING,
            allowNull: true,
            validate:{
                notEmpty: true
            }
        },
        city:{
            type:DataTypes.STRING,
            allowNull: true,
            validate:{
                notEmpty: true
            }
        },
        country:{
            type:DataTypes.STRING,
            allowNull: true,
            validate:{
                notEmpty: true
            }
        },
        email:{
            type:DataTypes.STRING,
            allowNull: true,
            validate:{
                notEmpty: true
            }
        },
        phone:{
            type:DataTypes.STRING,
            allowNull: true,
            validate:{
                notEmpty: true
            }
        },
        source:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        comments:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        source_link:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
    })
    return Clients
}