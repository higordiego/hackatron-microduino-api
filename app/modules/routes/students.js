module.exports = app => {
    const url = `${process.env.API_VERSION}/students`
    const Controller = require('../controllers/students')(app)

    app.route(url)
        .get(Controller.listAll)
        .post(Controller.create)
}
