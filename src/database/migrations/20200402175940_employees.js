
exports.up = function(knex) {
    return knex.schema.createTable('employees', function(table){
        table.string('employeeID').primary();
        table.string('name').notNullable();
        table.string('job').notNullable();
        table.string('wage').notNullable();
        table.string('departament').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('employees');
};