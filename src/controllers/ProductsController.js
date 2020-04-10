const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    //List all products
    async index(request, response){
        const { page = 1 } = request.query;
        //const { filters } = request.params;

        const products = await connection('inventory')
            .limit(10).offset((page - 1 ) * 10)
            .select('name', 'mainCategory', 'amount', 'price', 'productID');

        const [ count ] = await connection('inventory').count();

        response.header('X-Total-Products', count['count(*)']);

        return response.json(products);
    },

    //Create product
    async create(request, response){
        const { name, mainCategory, subCategory, amount, 
            price, cost, sendCompany, arrival
        } = request.body;

        const productID = crypto.randomBytes(4).toString('HEX');

        await connection('inventory').insert({
            productID, name, mainCategory, subCategory, amount, 
            price, cost, sendCompany, arrival,
        });

        return response.json({ 'Product created! ID': productID })
    },

    //Read one specific product
    async read(request, response){
        const { id } = request.params;

        const product = await connection('inventory')
            .where('productID', id).select('*').first();

        if ( product === undefined ){
            return response.status(404).json({ error: `ProductID ${ id } not found!` });
        }
        
        return response.json(product);
    },

    //Update one product
    async update(request, response){
        const { id } = request.params;

        const { name, mainCategory, subCategory, amount, 
            price, cost, sendCompany, arrival
        } = request.body;

        const product = await connection('inventory')
            .where('productID', id).first().update({
                name, mainCategory, subCategory, amount, 
                price, cost, sendCompany, arrival,
            }).select('productID');

        if ( product ===  undefined ){
            return response.status(404).json({ error: `ProductID ${ id } not found!` });
        }

        return response.status(201).json(`Product ${ id } updated!`);
    },

    //Delete one product
    async delete(request, response){
        const { id } = request.params;

        const product = await connection('inventory')
            .where('productID', id).first().select('productID');

        if ( product === undefined ){
            return response.status(404).json({ error: `ProductID ${ id } not found!` });
        }

        await connection('inventory')
            .where('productID', id).delete()

        return response.status(204);
    }
}