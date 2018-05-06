module.exports = app => {
    const url = `/`
    const Controller = require('../controllers/question')(app)

    app.route(url)
        .post(Controller.create)
        // .get(Controller.responseStudent)

    app.route(`${url}question/all`)
        .get(Controller.listAll)
}
