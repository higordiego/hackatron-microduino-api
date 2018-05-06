module.exports = app => {
    const url = `${process.env.API_VERSION}/users`
    const Controller = require('../controllers/users')(app)
    const Validate = require('../validates/users')(app)

    app.route(url)
        .get(app.jwt, Controller.listAll)
        .post(Validate.create, Validate.unique, Validate.isExist, Controller.create)

    app.route(`${url}/forgot`)
        .post(Validate.isEmail, Validate.forgot, Controller.forgot)

    app.route(`${url}/:id`)
        .get(app.jwt, Validate.isId, Controller.listOne)
        .put(app.jwt, Validate.isId, Validate.update, Controller.update)
        .delete(app.jwt, Validate.isId, Controller.delete)
}
