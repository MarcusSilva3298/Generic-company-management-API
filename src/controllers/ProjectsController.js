const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    //List all projects
    async index(request, response){
        const { page = 1 } = request.query;

        const projects = await connection('projects')
            .limit(10).offset(( page - 1) * 10)
            .select('name', 'projectID', 'profit', 'deadlineDate');

        const [ count ] = await connection('inventory').count();

        response.header('X-Total-Projects', count['count(*)']);

        return response.json(projects);
    },

    //Create new project
    async create(request, response){      
        const { name, description, startDate, deadlineDate, clients,
            price, costs } = request.body;

        const projectID = crypto.randomBytes(4).toString('HEX');
        const profit = price - costs;

        await connection('projects').insert({
            name, startDate, deadlineDate, clients, price, costs,
            profit, description, projectID
        });

        return response.json({ 'Project created! ID': projectID });
    },

    //Read one project
    async read(request, response){
        const { id } = request.params;

        const project = await connection('projects')
            .where('projectID', id).select('*').first();

        if ( project === undefined ){
            return response.status(404).json({ error: `ProjectID ${ id } not found!` })
        }

        return response.status(201).json(project)
    },

    //Update one project
    async update(request, response){
        const { id } = request.params;

        const { name, description, startDate, deadlineDate, clients,
            price, costs } = request.body;

        const profit = price - costs;

        const project = await connection('projects')
            .where('projectID', id).first().update({
                name, startDate, deadlineDate, clients, price, costs,
                profit, description
            })

        if ( project === undefined ){
            return response.status(404).json({ error: `ProjectID ${ id } not found!`})
        }

        return response.status(201).json(`Product ${ id } updated!`)
    },

    async delete(request, response){
        const { id } = request.params;

        const project = await connection('projects')
            .where('projectID', id).first();

        if ( project === undefined ){
            return response.status(404).json({ error: `ProjectID ${ id } not found!`})
        }

        await connection('projects')
            .where('projectID', id).delete()

        return response.status(204);
    }
}