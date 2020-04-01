const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    //Listagem de todos os produtos
    async index(require, response){
        const products = await connection('products').select('*');

        return response.json(products);
    }
}