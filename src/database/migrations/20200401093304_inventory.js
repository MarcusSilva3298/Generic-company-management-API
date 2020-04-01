exports.up = function(knex) {
    return knex.schema.createTable('products', function(table){
        table.string('productID').primary();
        table.string('name').notNullable();
        table.string('mainCategory').notNullable();
        table.string('subCategory');
        table.integer('amount').notNullable();
        table.decimal('price').notNullable();
        table.decimal('cost').notNullable();
        table.string('sendComapny').notNullable();
        table.date('arrival').notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
  