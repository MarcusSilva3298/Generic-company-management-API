const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    //List all employees
    async index(require, response){
        const { page = 1 } = require.query;
        
        const employees = await connection('employees')
            .limit(10).offset((page - 1 ) * 10 )
            .select('name', 'job', 'departament')

        const [ count ] = await connection('employees').count();

        response.header('X-Total-Products', count['count(*)']);

        return response.json(employees);
    },

    //Create new employee
    async create(require, response){
        const { name, job, wage, departament } = require.body;

        const employeeID = crypto.randomBytes(4).toString('HEX');

        await connection('employees').insert({
            name, job, wage, departament, employeeID
        });

        return response.json({ 'Employee created! ID': employeeID})
    },
}