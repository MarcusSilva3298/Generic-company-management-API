const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    //List all products
    async index(require, response){
        const { page = 1 } = require.query;
        const { filters } = require.params;

        const products = await connection('inventory')
            .limit(10).offset((page - 1 ) * 10)
            .select('name', 'mainCategory', 'amount', 'price', 'productID');

        const [ count ] = await connection('inventory').count();

        response.header('X-Total-Products', count['count(*)'])

        return response.json(products);
    },

    //Create product
    async create(require, response){
        const { name, mainCategory, subCategory, amount, 
            price, cost, sendCompany, arrival
        } = require.body;

        const productID = crypto.randomBytes(4).toString('HEX');

        await connection('inventory').insert({
            productID, name, mainCategory, subCategory, amount, 
            price, cost, sendCompany, arrival,
        });

        return response.json({ 'Product created! ID': productID })
    },

    //Read one specific product
    async read(require, response){
        const { id } = require.params;

        const product = await connection('inventory')
            .where('productID', id).select('*').first();

        if ( product === undefined ){
            return response.status(404).json({ error: `ProductID: ${ id } not found!` });
        }
        
        return response.json(product);
    },

    //Update one product
    async update(require, response){
        const { id } = require.params;

        const { name, mainCategory, subCategory, amount, 
            price, cost, sendCompany, arrival
        } = require.body;

        const newProduct = await connection('inventory')
            .where('productID', id).first().update({
                name, mainCategory, subCategory, amount, 
                price, cost, sendCompany, arrival,
            }).select('productID');

        if ( newProduct ===  undefined ){
            return response.status(404).json({ error: `ProductID: ${ id } not found!` });
        }

        return response.status(201).json(`Product ${ id } updated!`);
    },

    //Delete one product
    async delete(require, response){
        const { id } = require.params;

        const product = await connection('inventory')
            .where('productID', id).first().select('productID');

        if ( product === undefined ){
            return response.status(404).json({ error: `ProductID: ${ id } not found!` });
        }

        await connection('inventory')
            .where('productID', id).delete()

        return response.status(204).json(`ProductID: ${id} deleted`);
    }
}