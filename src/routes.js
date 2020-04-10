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

routes.route('/employees/:id')
    .get(EmployeesController.read)

    .put(EmployeesController.update)

    .delete(EmployeesController.delete)


//Projects Routes
const ProjectsController = require('./controllers/ProjectsController');

routes.route('/projects')
    .get(ProjectsController.index)

    .post(ProjectsController.create)

routes.route('/projects/:id')
    .get(ProjectsController.read)

    .put(ProjectsController.update)

    .delete(ProjectsController.delete)

//Sales Routes
const SalesController = require('./controllers/SalesController');

routes.route('/sales')
    .get(SalesController.index)

    .post(SalesController.create)

routes.route('/sales/:id')
    .get(SalesController.read)

    .delete(SalesController.delete)

module.exports = routes;