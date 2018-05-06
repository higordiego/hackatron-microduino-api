module.exports = app => {
    const Errors = require('../../errors/system/error')
    const Validate = require('../../helpers/validate')
    const Help = require('../../helpers/authenticate')
    const User = app.datasource.models.User
    const Persistence = require('../../helpers/persistence')(User)
    const Business = require('../business/authenticate')(app)

    return {
        authenticate: Help.authenticate(User, Validate, Business, Errors),
        logout: (req, res) =>
            Persistence.update({
                where: {
                    $and: [
                        {id: req.user.id},
                        {cpf: req.user.cpf}
                    ]
                }
            }, res)({token: null}),
        me: (req, res) =>
            Persistence.listOne({
                where: {
                    $and: [
                        {id: req.user.id},
                        {token: req.user.token}
                    ]
                },
                attributes: {
                    exclude: ['password', 'token', 'forgot']
                },
                include: {
                    all: true
                }
            }, res)
    }
}
