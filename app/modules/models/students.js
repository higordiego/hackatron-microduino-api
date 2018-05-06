module.exports = (sequelize, DataType) => {
    const Students = sequelize.define('Students', {
        name: {
            type: DataType.STRING(255),
            allowNull: true,
            index: true,
            validate: {
                notEmpty: false
            }
        },
        discipline: {
            type: DataType.STRING(255),
            allowNull: true,
            index: true,
            validate: {
                notEmpty: false
            }
        }
    })

    Students.associate = (models) => {
        // Users.belongsTo(models.TypesUser, {foreignKey: {allowNull: false}})
    }

    return Students
}
