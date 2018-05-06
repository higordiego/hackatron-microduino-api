module.exports = (sequelize, DataType) => {
    const Users = sequelize.define('User', {
        name: {
            type: DataType.STRING(255),
            allowNull: true,
            index: true,
            validate: {
                notEmpty: false
            }
        },
        token: {
            type: DataType.TEXT,
            index: true
        },
        CPF: {
            type: DataType.STRING(255),
            index: true,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            index: true,
            validate: {
                notEmpty: true
            }
        },

        status: {
            type: DataType.BOOLEAN,
            index: true,
            allowNull: false,
            defaultValue: true
        }
    })

    Users.associate = (models) => {
        // Users.belongsTo(models.TypesUser, {foreignKey: {allowNull: false}})
    }

    return Users
}
