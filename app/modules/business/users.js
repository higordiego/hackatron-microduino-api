module.exports = app => {
    const User = app.datasource.models.User
    const Generator = require('../../helpers/generator')(app)
    const errorSistem = require('../../errors/system/error')
    const crypto = require('../../helpers/crypto')

    const SendEmail = require('../../helpers/sendEmail')

    const cryptoPassword = password => crypto.md5(password)
    const isPassword = object => object.password ? cryptoPassword(object.password) : null

    const isPicture = object => object.avatar ? object.file.filename : null

    return {
        create: (object) => new Promise((resolve, reject) => {
            try {
                object.name = object.name
                object.email = object.email.toLowerCase()
                object.password = isPassword(object)
                resolve(object)
            } catch (err) {
                console.log(err)
                reject(errorSistem.dataProcessing)
            }
        }),

        createUser: (object) => User.create(object),
        userOne: object => User.findOne({where: {email: object.email}, raw: true}),
        forgot: object => new Promise((resolve, reject) => {
            try {
                const Template = require('../../templates/forgot-html')
                object.passwordClean = Generator.active()
                object.password = cryptoPassword(`${object.passwordClean}`)
                SendEmail.send(object, Template, 'Esqueceu sua senha ?')
                delete object['passwordClean']
                resolve(object)
            } catch (err) {
                console.log(err)
                reject(errorSistem.dataProcessing)
            }
        }),
        update: (object) => new Promise((resolve, reject) => {
            try {
                const validatePassword = isPassword(object)
                if (validatePassword !== null) {
                    object.password = validatePassword
                }
                const validatePicture = isPicture(object)
                if (validatePicture !== null) {
                    object.avatar = validatePicture
                }
                resolve(object)
            } catch (err) {
                console.log('erro', err)
                reject(errorSistem.tratmentUpdateUser)
            }
        })
    }
}
