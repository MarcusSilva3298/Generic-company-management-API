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

    //Read one employee
    async read(require, response){
        const { id } = require.params;
        
        const employee = await connection('employees')
            .where('employeeID', id).select('*').first()

        if ( employee === undefined ){
            return response.status(404).json({ error: `EmployeeID ${ id } not found!` })
        }

        return response.json(employee);
    },

    //Upadte one employee
    async update(require, response){
        const { id } = require.params;

        const { name, job, wage, dapartment } = require.body;

        const employee = await connection('employees')
            .where('employeeID', id).first().update({
                name, job, wage, dapartment
            }).select('employeeID');

        if ( employee === undefined ){
            return response.json(404).json({ error: `EmployeeID ${ id } not found!` })
        }

        return response.status(201).json(`Product ${ id } updated`)
    },

    //Delete one employee
    async delete(require, response){
        const { id } = require.params;

        const employee = await connection('employees')
            .where('employeeID', id).first().select('employeeID');

        if ( employee === undefined ){
            return response.status(404).json({ error: `EmployeeID ${ id } not found!` });
        }

        await connection('employees')
            .where('employeeID', id).delete();

        return response.status(204).json(`EmployeeID: ${ id } deleted`);
    },
}