const callbackObject = require('./returnObject')
module.exports = Model => {
    const HelperPaginate = require('../helpers/paginate')(Model)
    return {
        create: (res) => (data) => Model.create(data, {raw: true})
            .then(result => callbackObject.returnCreateSuccess(result, res))
            .catch(callbackObject.returnError(res)),

        listAll: (query, res) => pages =>
            HelperPaginate.countAll(pages)
                .then(HelperPaginate.listAll(query))
                .then(callbackObject.returnListSuccess(res))
                .catch(callbackObject.returnError(res)),

        listOne: (query, res) => Model.findOne(query)
            .then(callbackObject.returnListOneSuccess(res))
            .catch(callbackObject.returnError(res)),

        delete: (query, res) => Model.destroy(query)
            .then(result => callbackObject.returnDelete(result, res))
            .catch(callbackObject.returnError(res)),

        update: (query, res) => (mod) => Model.update(mod, query)
            .then(result => callbackObject.returnUpdate(result, res))
            .catch(callbackObject.returnError(res))
    }
}
