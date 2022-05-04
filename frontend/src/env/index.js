import development from './development'
import production from './production'

const joinEnv = { development, production }
const env = joinEnv[process.env.REACT_APP_ENV || process.env.NODE_ENV]

export default env