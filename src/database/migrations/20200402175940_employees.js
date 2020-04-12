
exports.up = function(knex) {
    return knex.schema.createTable('employees', function(table){
        table.string('employeeID').primary();
        table.string('name').notNullable();
        table.string('job').notNullable();
        table.decimal('wage').notNullable();
        table.string('department').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('employees');
};