const configPageLimit = parseInt(process.env.PAGINATE_LIMIT)

const PaginatePrepareQuery = (page, resolve) => data => resolve({
    pages: Math.ceil(data.count / configPageLimit),
    offset: configPageLimit * ((page || 1) - 1),
    limit: configPageLimit,
    count: data.count
})

const queryListAll = query => pages => Object.assign(query, {limit: pages.limit, offset: pages.offset, $sort: {id: 1}})

module.exports = (Model) => ({
    countAll: (page) => new Promise((resolve, reject) => {
        Model.findAndCountAll({where: {}})
            .then(PaginatePrepareQuery(page, resolve))
            .catch(reject)
    }),

    listAll: query => pages => new Promise((resolve, reject) =>
        Model.findAll(queryListAll(query)(pages))
            .then(model => resolve({data: model, count: pages.count, pages: pages.pages}))
            .catch(reject))
})
