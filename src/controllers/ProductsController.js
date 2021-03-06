const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    //List all products
    async index(request, response){
        const { page = 1 } = request.query;
        const { name, mainCategory, brand } = request.query;

        const products = await connection('inventory')
            .limit(5).offset((page - 1 ) * 5)
            .select('productID', 'name', 'mainCategory', 'brand', 'amount', 'price')
            .orderBy('name')
            .modify( function ( products ){
                if ( name ){
                    products.where('name', name)
                }
                if ( mainCategory ){
                    products.where('mainCategory', mainCategory)
                }
                if ( brand ){
                    products.where('brand', brand)
                }
            });

        const [ count ] = await connection('inventory').count();

        response.header('X-Total-Products', count['count(*)']);

        return response.status(200).json({ Filters: 'name, mainCategory, brand', products });
    },

    //Create product
    async create(request, response){
        const { 
            name, mainCategory, subCategory, amount, 
            price, cost, brand, arrival
        } = request.body;

        if ( arrival !== undefined ){
            var date = new Date(arrival);
        }else{
            var date = new Date();
        }

        const productID = crypto.randomBytes(4).toString('HEX');

        await connection('inventory')
            .insert({
                productID, name, mainCategory, subCategory, 
                amount, price, cost, brand, 
                dateArrival: date.toLocaleDateString(), timeArrival: date.toLocaleTimeString()
            });

        return response.status(201).json({ 'Product created! ID': productID })
    },

    //Read one specific product
    async read(request, response){
        const { id } = request.params;

        const product = await connection('inventory')
            .where('productID', id)
            .select('*')
            .first();

        if ( product === undefined ){
            return response.status(404).json({ error: `ProductID ${ id } not found!` });
        }
        
        return response.status(200).json(product);
    },

    //Update one product
    async update(request, response){
        const { id } = request.params;

        const { 
            name, mainCategory, subCategory, amount, 
            price, cost, sendCompany, arrival
        } = request.body;

        const date = new Date(arrival);

        const product = await connection('inventory')
            .where('productID', id)
            .first()
            .update({
                name, mainCategory, subCategory, amount, 
                price, cost, sendCompany, dateArrival: date.toLocaleDateString(),
                timeArrival: date.toLocaleTimeString()
            });

        if ( product ===  undefined ){
            return response.status(404).json({ error: `ProductID ${ id } not found!` });
        }

        return response.status(205).json(`Product ${ id } updated!`);
    },

    //Delete one product
    async delete(request, response){
        const { id } = request.params;

        const product = await connection('inventory')
            .where('productID', id)
            .first();

        if ( product === undefined ){
            return response.status(404).json({ error: `ProductID ${ id } not found!` });
        }

        await connection('inventory')
            .where('productID', id)
            .delete()

        return response.redirect(200, '/inventory');
    }
}