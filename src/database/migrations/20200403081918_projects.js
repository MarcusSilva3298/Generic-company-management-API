
exports.up = function(knex) {
    return knex.schema.createTable('projects', function(table){
        table.string('projectID').primary();
        table.string('name').notNullable();
        table.text('description').notNullable();
        table.date('startDate').notNullable();
        table.date('deadlineDate').notNullable();
        table.string('clients').notNullable();
        table.decimal('price').notNullable();
        table.decimal('costs').notNullable();
    
        table.decimal('profit').notNullable();
    })
    //output: "2020-04-03"
};

exports.down = function(knex) {
    return knex.schema.dropTable('projects');
};
