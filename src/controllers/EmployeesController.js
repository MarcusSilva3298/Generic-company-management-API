const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    //List all employees
    async index(request, response){
        const { page = 1 } = request.query;
        
        const employees = await connection('employees')
            .limit(10).offset((page - 1 ) * 10 )
            .select('name', 'job', 'department', 'employeeID');

        const [ count ] = await connection('employees').count();

        response.header('X-Total-Products', count['count(*)']);

        return response.json(employees);
    },

    //Create new employee
    async create(request, response){
        const { name, job, wage, department } = request.body;

        const employeeID = crypto.randomBytes(4).toString('HEX');

        await connection('employees').insert({
            name, job, wage, department, employeeID
        });

        return response.json({ 'Employee created! ID': employeeID})
    },

    //Read one employee
    async read(request, response){
        const { id } = request.params;
        
        const employee = await connection('employees')
            .where('employeeID', id).select('*').first()

        if ( employee === undefined ){
            return response.status(404).json({ error: `EmployeeID ${ id } not found!` })
        }

        return response.json(employee);
    },

    //Upadte one employee
    async update(request, response){
        const { id } = request.params;

        const { name, job, wage, dapartment } = request.body;

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
    async delete(request, response){
        const { id } = request.params;

        const employee = await connection('employees')
            .where('employeeID', id).first().select('employeeID');

        if ( employee === undefined ){
            return response.status(404).json({ error: `EmployeeID ${ id } not found!` });
        }

        await connection('employees')
            .where('employeeID', id).delete();

        return response.status(204);
    },
}