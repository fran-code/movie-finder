const local = require('./local')
const production = require('./production')

const joinEnv = { local, production }
const env = joinEnv[process.env.NODE_ENV]

module.exports = env