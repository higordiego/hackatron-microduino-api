module.exports = app => {
    const url = `${process.env.API_VERSION}/authenticate`
    const Controller = require('../controllers/authenticate')(app)
    const Validate = require('../validates/authenticate')(app)

    app.route(`${url}`)
        .post(Validate.authenticate, Controller.authenticate)

    app.route(`${process.env.API_VERSION}/me`)
        .get(app.jwt, Controller.me)

    app.route(`${process.env.API_VERSION}/logout`)
        .get(app.jwt, Controller.logout)
}
