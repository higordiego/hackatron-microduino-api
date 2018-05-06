const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')

let database = null

const loadModels = (sequelize) => {
    const dir = path.join(__dirname, '../modules/models')
    const models = []
    fs.readdirSync(dir).forEach((file) => {
        const modelDir = path.join(dir, file)
        const model = sequelize.import(modelDir)
        models[model.name] = model
    })

    Object.keys(models).forEach(function (object) {
        if ('associate' in models[object]) {
            models[object].associate(models)
        }
    })

    return models
}

module.exports = (app) => {
    if (!database) {
        const sequelize = new Sequelize(
            process.env.MYSQL_DATABSE,
            process.env.MYSQL_USER,
            process.env.MYSQL_PASSWORD,
            {
                host: process.env.MYSQL_HOST,
                dialect: 'mysql',
                logging: false,
                operatorsAliases: true,
                pool: {
                    max: 5,
                    min: 0,
                    evict: 10000,
                    acquire: 10000,
                    maxIdleTime: 30,
                    handleDisconnects: true
                },
                define: {
                    underscored: true
                },
                dialectOptions: {
                    useUTC: false
                },
                retry: {
                    max: 5
                }
            })
        database = {
            sequelize,
            Sequelize,
            models: {}
        }

        database.models = loadModels(sequelize)
        sequelize.sync().done(() => database)
    }
    return database
}
