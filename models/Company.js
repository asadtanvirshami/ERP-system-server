module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define("Company", {
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
        phone:{
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
        no_of_employees:{
            type:DataTypes.INTEGER
        },
        no_of_partners:{
            type:DataTypes.INTEGER
        },
        location:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        address:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        revenue:{
            type:DataTypes.INTEGER
        },
        legal_doc:{
            type:DataTypes.STRING
        },
    })
    return Company
}