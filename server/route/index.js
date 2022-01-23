const userRoutes = require('./user')
const adminRoutes = require('./admin')
const routes ={
    user:userRoutes,
    admin:adminRoutes
}
module.exports = {routes}