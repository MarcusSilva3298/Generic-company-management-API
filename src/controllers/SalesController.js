const connection = require('../database/connection')

module.exports = {
    //List all sales
    async index(request, response){
        const { page = 1 } = request.query;

        const sales = await connection('sales')
            .limit(10).offset((page - 1 ) * 10)
            .select('productID', 'productName','amount','income');
        
        const [ count ] = await connection('sales').count();

        response.header('X-Total-Sales', count['count(*)']);

        return response.status(200).json(sales);
    },

    //Create new sale
    async create(request, response){
        const { amount, discount, client, productID } = request.body;

        const amnt = await connection('inventory')
            .where('productID', productID).select('amount').first();
        
        const stockAmount = amnt.amount;

        if ( stockAmount < amount ){
            return response.status(400).json(`There are only ${ stockAmount } units of this product in stock`);
        }

        const NewAmount = stockAmount - amount;
        

        const name = await connection('inventory')
            .where('productID', productID).select('name').first();
        const productName = name.name;

        const price = await connection('inventory')
            .where('productID', productID).select('price').first();
        const productUnitValue = price.price;

        const income = productUnitValue * amount * ( discount / 100) ;

        await connection('sales').insert({
            amount, discount, client, productID, productName, income
        })

        
        await connection('inventory').where('productID', productID)
        .update('amount', NewAmount);

        return response.status(201).json(`Sold ${ amount } of ${ productName } by ${ income }`)
    },

    async read(request, response){
        const { id } = request.params;

        const sale = await connection('sales').where('saleID', id)
            .select('*').first();

        if ( sale === undefined ){
            return response.status(404).json({ errror: `ProductID ${ id } not found!` })
        }

        return response.json(sale);
    },
    
    //Delete one sale
    async delete(request, response){
        const { id } = request.params;

        const sale = await connection('sales').where('saleID', id)
            .select('saleID').first();

        if ( sale === undefined ){
            return response.status(404).json({ error: `ProductID ${ id } not found!` })
        }

        await connection('sales').where('saleID', id).delete();

        return response.status(204);
    }
}