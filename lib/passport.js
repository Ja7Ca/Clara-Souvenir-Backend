const passport = require('passport')
const { Strategy : JwtStrategy, ExtractJwt } = require('passport-jwt')
const { user } = require('../models')

// Passport JTW options
const options = {
    // Extract jwt dari request
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),

    // Harus sama di model User
    secretOrKey: "Ini sangat rahasia", 
}

passport.use(new JwtStrategy (options, async (payload, done) => {
    console.log(payload)
    if(payload.exp > Date.now()) {
        return done(err, false)
    }
    user.findOne({
        where: { username: payload.username },
        attributes: { exclude: ["password"] }
    })
    .then((userLog) => {
        console.log(userLog)
        done(null, userLog)
    })
    .catch((err) => {
        console.log(err)
        done(err, false)
    })
}))

module.exports = passport