const userController = require('./user')
const AdminController = require('./admin')
const hrcontroller = require('./hr')
const controllers = {
    user:userController,
    admin:AdminController,
    hr:hrcontroller
}
module.exports = {controllers}