const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    //List all projects
    async index(require, response){
        const projects = await connection('projects')
            .select('name', 'projectID', 'profit', 'deadlineDate');

        return response.json(projects);
    },

    //Create new project
    async create(require, response){      
        const { name, description, startDate, deadlineDate, clients,
            price, costs } = require.body;

        const projectID = crypto.randomBytes(4).toString('HEX');
        const profit = price - costs;

        await connection('projects').insert({
            name, startDate, deadlineDate, clients, price, costs,
            profit, description, projectID
        });

        return response.json({ 'Project created! ID': projectID });
    },

    //Read one project
    async read(require, response){
        const { id } = require.params;

        const project = await connection('projects')
            .where('projectID', id).select('*').first();

        if ( project === undefined ){
            return response.status(404).json({ error: `ProjectID ${ id } not found!` })
        }

        return response.status(201).json(project)
    },

    //Update one project
    async update(require, response){
        const { id } = require.params;

        const { name, description, startDate, deadlineDate, clients,
            price, costs } = require.body;

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

    async delete(require, response){
        const { id } = require.params;

        const project = await connection('projects')
            .where('projectID', id).first();

        if ( project === undefined ){
            return response.status(404).json({ error: `ProjectID ${ id } not found!`})
        }

        await connection('projects')
            .where('projectID', id).delete()

        return response.status(201).json(`Project ${ id } deleted`);
    }
}