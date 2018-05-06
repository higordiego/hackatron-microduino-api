module.exports = app => {
    const Generator = require('../../helpers/generator')(app)
    const Errors = require('../../errors/system/error')
    const Users = app.datasource.models.User

    const isUpdate = (tokenGenerator, res) => (object) => (object[0])
        ? res.status(200).json({token: tokenGenerator})
        : res.status(400).json([Errors.dataProcessing])

    return {
        authenticate: (res) => (object) => {
            try {
                const payload = {id: object.id, name: object.name, email: object.email}
                const tokenGenerator = Generator.token(payload)
                const query = {where: {id: object.id}}
                const mod = {token: tokenGenerator, first: false}
                Users.update(mod, query)
                    .then(isUpdate(tokenGenerator, res))
                    .catch(() => res.status(400).json([Errors.dataProcessing]))
            } catch (err) {
                res.status(400).json([Errors.dataProcessing])
            }
        }
    }
}
