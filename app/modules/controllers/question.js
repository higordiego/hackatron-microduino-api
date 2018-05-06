module.exports = app => {
    const Question = app.datasource.models.Question
    const Persistence = require('../../helpers/persistence')(Question)
    const Validate = require('../../helpers/validate')

    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'open')(body)
            body.user_id = 1
            Persistence.create(res)(body)
        },
        listAll: async (req, res) => {
            const students = await Question.findAll()
            res.status(200).json(students)
        }
    }
}
