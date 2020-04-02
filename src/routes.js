const express = require('express');
const routes = express.Router();

//Inventory routes
const ProductsController = require('./controllers/ProductsController');
routes.route('/inventory')
    .get(ProductsController.index)

    .post(ProductsController.create)

routes.route('/inventory/:id')
    .get(ProductsController.read)

    .put(ProductsController.update)

    .delete(ProductsController.delete)


//Employees Routes
const EmployeesController = require('./controllers/EmployeesController');
routes.route('/employees')
    .get(EmployeesController.index)

    .post(EmployeesController.create)


module.exports = routes;