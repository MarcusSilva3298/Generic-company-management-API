const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    //List all employees
    async index(request, response){
        const { page = 1 } = request.query;
        
        const employees = await connection('employees')
            .limit(5).offset((page - 1 ) * 5 )
            .select('name', 'job', 'department', 'employeeID')
            .orderBy('name', 'department');

        const [ count ] = await connection('employees').count();

        response.header('X-Total-Products', count['count(*)']);

        return response.status(200).json(employees);
    },

    //Create new employee
    async create(request, response){
        const { name, job, wage, department } = request.body;

        const employeeID = crypto.randomBytes(4).toString('HEX');

        await connection('employees')
            .insert({
                name, job, wage, department, employeeID
            });

        return response.status(201).json({ 'Employee created! ID': employeeID})
    },

    //Read one employee
    async read(request, response){
        const { id } = request.params;
        
        const employee = await connection('employees')
            .where('employeeID', id)
            .select('*')
            .first();

        if ( employee === undefined ){
            return response.status(404).json({ error: `EmployeeID ${ id } not found!` })
        }

        return response.status(200).json(employee);
    },

    //Upadte one employee
    async update(request, response){
        const { id } = request.params;

        const { name, job, wage, department } = request.body;

        const employee = await connection('employees')
            .where('employeeID', id)
            .select('employeeID')
            .first()
            .update({
                name, job, wage, department
            });

        if ( employee === undefined ){
            return response.json(404).json({ error: `EmployeeID ${ id } not found!` })
        }

        return response.status(205).json(`Product ${ id } updated`)
    },

    //Delete one employee
    async delete(request, response){
        const { id } = request.params;

        const employee = await connection('employees')
            .where('employeeID', id)
            .select('employeeID')
            .first();

        if ( employee === undefined ){
            return response.status(404).json({ error: `EmployeeID ${ id } not found!` });
        }

        await connection('employees')
            .where('employeeID', id)
            .delete();

        return response.redirect(200, '/employees');
    }
}