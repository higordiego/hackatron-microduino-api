module.exports = app => {
    const Errors = require('../../errors/user/error')
    const Validate = require('../../helpers/validate')
    const User = app.datasource.models.User
    const TypesUser = app.datasource.models.TypesUser
    return {
        create: (req, res, next) => {
            const required = ['cpf', 'password', 'name', 'types_user_id']
            const error = Validate.requestRequired(req, required, Errors)
            error ? res.status(400).json(error) : next()
        },
        update: (req, res, next) => {
            const required = ['cpf', 'password', 'name']
            const error = Validate.requestOptional(req, required, Errors)
            error ? res.status(400).json(error) : next()
        },
        completeUnique: (req, res, next) => {
            Validate.searchQuery(User, {where: {id: req.user.id, complete: false}})
                .then(model => !model ? res.status(400).json([Errors.completeUser]) : next())
                .catch(err => res.status(500).json(err))
        },


        isEmail: (req, res, next) => {
            const required = ['cpf']
            const error = Validate.requestRequired(req, required, Errors)
            error ? res.status(400).json(error) : next()
        },

        forgot: (req, res, next) =>
            Validate.searchQuery(User, {where: {cpf: req.body.cpf}})
                .then(model => !model ? res.status(400).json([Errors.cpfNotExist]) : next())
                .catch(err => res.status(500).json(err)),

        isId: (req, res, next) => Validate.isNumber(req.params.id, res, next, Errors.idNotValid),

        passwordToEquals: (req, res, next) => {
            const required = ['passwordOne', 'passwordTwo']
            const error = Validate.requestRequired(req, required, Errors)
            if (error) {
                res.status(400).json(error)
            } else if (req.body.passwordOne === req.body.passwordTwo) {
                next()
            } else {
                res.status(400).json([Errors.passwordNotToEquals])
            }
        },
        strongassword: (req, res, next) => {
            const required = ['passwordOne', 'passwordTwo']
            const error = Validate.requestStrong(req, required, Errors)
            error ? res.status(400).json(error) : next()
        },
        isExist: (req, res, next) =>
            Validate.searchQuery(TypesUser, {where: {id: req.body.types_user_id}})
                .then(model => model ? res.status(400).json([Errors.typeUserExist]) : next())
                .catch(err => res.status(500).json(err)),
        unique: (req, res, next) =>
            Validate.searchQuery(User, {where: [{email: req.body.email.toLowerCase()}]})
                .then(model => model ? res.status(400).json([Errors.existUser]) : next())
                .catch(err => res.status(500).json(err))
    }
}
