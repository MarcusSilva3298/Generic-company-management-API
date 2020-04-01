const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    //List all products
    async index(require, response){
        const products = await connection('inventory').select('*');

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
    }
}