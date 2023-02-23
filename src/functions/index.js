require('dotenv').config()
const { sign } = require('jsonwebtoken')

module.exports = {
    sendStatus: (sts, msg) => ({
        error: sts,
        msg: msg?msg:sts?"Operação bem-sucedida":"Algo de errado ocorreu!"
    }),
    generateToken: (params = {}) => sign(params, process.env.APP_HASH, {
        expiresIn: 3.156e+7
    })
}