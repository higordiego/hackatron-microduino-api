module.exports = (sequelize, DataType) => {
    const QuestionIn = sequelize.define('QuestionIn', { })

    QuestionIn.associate = (models) => {
        QuestionIn.belongsTo(models.Question, {foreignKey: {allowNull: false}})
        QuestionIn.belongsTo(models.Students, {foreignKey: {allowNull: false}})
    }

    return QuestionIn
}
