
exports.up = function(knex) {
    return knex.schema.createTable('sales', function(table){
        table.increments('saleID');
        table.string('productID').notNullable();
        table.string('productName').notNullable();
        table.integer('amount').notNullable();
        table.decimal('income').notNullable();
        table.decimal('discount').notNullable();
        table.string('client');
        table.date('date').defaultTo(knex.fn.now());

        table.foreign('productID').references('productID').inTable('inventory');
        table.foreign('productName').references('name').inTable('inventory');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('sales');
};
