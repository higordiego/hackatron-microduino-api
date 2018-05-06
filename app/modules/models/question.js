module.exports = (sequelize, DataType) => {
    const Question = sequelize.define('Question', {
        open: {
            type: DataType.BOOLEAN,
            allowNull: true,
            index: true,
            defaulValue: true,
            validate: {
                notEmpty: false
            }
        }
    })

    Question.associate = (models) => {
        Question.belongsTo(models.User, {foreignKey: {allowNull: false}})
    }

    return Question
}
