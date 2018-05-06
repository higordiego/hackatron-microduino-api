module.exports = app => {
    const Trigger = app.datasource.models.Trigger
    const Persistence = require('../../helpers/persistence')(Trigger)
    const Validate = require('../../helpers/validate')

    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'description')(body)
            Persistence.create(res)(body)
        },
        listAll: async (req, res) => {
            const triggers = await Trigger.findAll()
            res.status(200).json(triggers)
        }
    }
}
