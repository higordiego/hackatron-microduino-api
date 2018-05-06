module.exports = app => {
    const User = app.datasource.models.User
    const Persistence = require('../../helpers/persistence')(User)
    const Business = require('../business/users')(app)
    const Validate = require('../../helpers/validate')
    const crypto = require('../../helpers/crypto')
    return {
        create: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'email', 'password', 'types_user_id')(body)
            Business.create(body)
                .then(Business.createUser)
                .then(user => res.status(201).json(user))
                .catch(err => res.status(500).json(err))
        },
        forgot: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'cpf')(body)
            Business.forgot(req.body)
                .then(Persistence.update({where: {cpf: req.body.cpf.toLowerCase()}}, res))
                .catch(err => res.status(500).json(err))
        },
        update: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'name', 'email', 'password', 'types_user_id')(body)
            Business.update(body)
                .then(Persistence.update({where: req.params}, res))
                .catch(err => res.status(500).json(err))
        },
        delete: (req, res) => Persistence.update({
            where: {
                $and: [
                    req.params,
                    {status: true}
                ]
            }
        }, res)({status: false}),
        forgotPassword: (req, res) => {
            const body = {}
            Validate.validateBody(req.body, 'passwordOne', 'passwordTwo')(body)
            Persistence.update({where: {active: req.params.active}}, res)({password: crypto.md5(body.passwordOne), active: null})
        },
        listAll: (req, res) =>
            Persistence.listAll({
                where: {status: true},
                include: {all: true},
                attributes: {exclude: ['token', 'password', 'forgot']}
            }, res)(req.query.page),
        listOne: (req, res) =>
            Persistence.listOne({
                where: {
                    $and: [
                        req.params,
                        {status: true}
                    ]
                },
                include: {all: true},
                attributes: {exclude: ['token', 'password', 'forgot']}
            }, res)
    }
}
