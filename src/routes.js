const express = require('express');
const routes = express.Router();

const ProductsController = require('./controllers/ProductsController');
routes.route('/inventory')
    .get(ProductsController.index)

    .post(ProductsController.create)

routes.route('/inventory/:id')
    .get(ProductsController.read)

    .put(ProductsController.update)

    .delete(ProductsController.delete)

module.exports = routes;