module.exports = app => {
    const Students = app.datasource.models.Students
    const Persistence = require('../../helpers/persistence')(Students)
    const Validate = require('../../helpers/validate')

    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'discipline')(body)
            Persistence.create(res)(body)
        },
        listAll: async (req, res) => {
            console.log('estou aqui')
            const students = await Students.findAll()
            res.status(200).json(students)
        }
    }
}
