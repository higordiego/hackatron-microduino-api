module.exports = app => {
    const url = `${process.env.API_VERSION}/triggers`
    const Controller = require('../controllers/trigger')(app)

    app.route(url)
        .get(Controller.listAll)
        .post(Controller.create)
}
