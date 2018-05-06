module.exports = ({
    send: (User, Template, Description) => {
        const nodemailer = require('nodemailer')
        const template = Template

        const config = {
            remetente: process.env.EMAIL_REMETENT,
            assunto: Description
        }

        const html = template(User)

        const transporte = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        console.log(User, html)
        transporte.sendMail({
            from: config.remetente,
            to: User.email,
            subject: config.assunto,
            html: html
        }, (err) => {
            if (err) console.log(err)
        })
    }
})
