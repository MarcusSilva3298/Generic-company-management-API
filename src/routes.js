const express = require('express');
const routes = express.Router();

const ProductsController = require('./controllers/ProductsController');
routes.route('/inventory')
    .get(ProductsController.index)

    .post(ProductsController.create)

module.exports = routes;