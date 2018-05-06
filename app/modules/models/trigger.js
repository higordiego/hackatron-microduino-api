module.exports = (sequelize, DataType) => {
    const Trigger = sequelize.define('Trigger', {
        name: {
            type: DataType.STRING(255),
            allowNull: true,
            index: true,
            validate: {
                notEmpty: false
            }
        },
        description: {
            type: DataType.TEXT('long'),
            allowNull: true,
            index: true,
            validate: {
                notEmpty: false
            }
        }
    })

    Trigger.associate = (models) => {
        // Users.belongsTo(models.TypesUser, {foreignKey: {allowNull: false}})
    }

    return Trigger
}
