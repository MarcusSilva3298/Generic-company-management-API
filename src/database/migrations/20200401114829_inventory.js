
exports.up = function(knex) {
    return knex.schema.createTable('inventory', function(table){
        table.string('productID').primary();
        table.string('name').notNullable();
        table.string('mainCategory').notNullable();
        table.string('subCategory');
        table.integer('amount').notNullable();
        table.decimal('price').notNullable();
        table.decimal('cost').notNullable();
        table.string('sendCompany').notNullable();
        table.date('dateArrival').notNullable();
        table.datetime('timeArrival').notNullable();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('inventory');
};
