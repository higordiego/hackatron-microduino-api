const crypto = require('./crypto')
const authenticate = (User, Validate, Business, Errors) =>
    (req, res, next) => {
        const query = {
            where: {
                $and:
                [{
                    cpf: req.body.cpf.toLowerCase()
                }, {
                    password: crypto.md5(req.body.password)
                }, {
                    status: true
                }]
            },
            attributes: {
                exclude: ['password', 'token', 'forgot']
            }
        }

        Validate.searchQuery(User, query)
            .then(Validate.isEmptyObject(res, Errors.notAuthorization))
            .then(Business.authenticate(res))
            .catch(err => res.status(401).json([err]))
    }

module.exports = {
    authenticate
}
