const {user} = require('../models')
const passport = require("../lib/passport");

const regex = /^[A-Za-z0-9 ]+$/

function formatUser(user) {
    const {id, username} = user.dataValues
    return user.generateToken(id, username)
}

module.exports = {
    postLogin: (req, res) => {
        const {username, password} = req.body
        if(!regex.test(username) || !regex.test(password)){
            res.json({message: "Dilarang Menggunakan Character Spesial!", success: false})
        } else {
            user.authenticate(username, password)
            .then(status => {
                let token = formatUser(status)
                res.json({message: "Login Berhasil", success: true, data: {token}})
            })
            .catch(err => {
                res.json({message: err.message, success: false, data: {}})
            })
        }
    },
    login: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }),
    getWhoami: (req, res) => {
        res.json(req.user)
    }
}