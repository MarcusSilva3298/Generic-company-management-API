const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    //List all projects
    async index(request, response){
        const { page = 1 } = request.query;
        const { name, startDate, deadlineDate, client } = request.query

        const projects = await connection('projects')
            .limit(5).offset(( page - 1) * 5)
            .select('projectID', 'name', 'profit', 'client', 'startDate', 'deadlineDate')
            .orderBy('name')
            .modify( function ( projects ){
                if ( name ){
                    projects.where('name', name);
                }
                if ( client ){
                    projects.where('client', client);
                }
                if ( startDate ){
                    const date = new Date(startDate)
                    projects.where('startDate', date.toLocaleDateString())
                }
                if ( deadlineDate ){
                    const date1 = new Date(deadlineDate)
                    projects.where('deadlineDate', date1.toLocaleDateString())
                }
            });

        const [ count ] = await connection('inventory').count();

        response.header('X-Total-Projects', count['count(*)']);

        return response.status(200).json({ Filters: 'name, client, startDate, deadlineDate', projects });
    },

    //Create new project
    async create(request, response){      
        const { 
            name, description, startDate, deadlineDate, 
            client, price, costs 
        } = request.body;

        const strtDate = new Date(startDate);
        const dlnDate = new Date(deadlineDate);

        const projectID = crypto.randomBytes(4).toString('HEX');
        const profit = price - costs;

        await connection('projects')
        .insert({
            name, client, description, price,
            costs, projectID, profit, startDate: strtDate.toLocaleDateString(),
            deadlineDate: dlnDate.toLocaleDateString()
        });

        return response.status(201).json({ 'Project created! ID': projectID });
    },

    //Read one project
    async read(request, response){
        const { id } = request.params;

        const project = await connection('projects')
            .where('projectID', id)
            .select('*')
            .first();

        if ( project === undefined ){
            return response.status(404).json({ error: `ProjectID ${ id } not found!` })
        }

        return response.status(200).json(project)
    },

    //Update one project
    async update(request, response){
        const { id } = request.params;

        const { 
            name, description, startDate, deadlineDate, 
            clients, price, costs 
        } = request.body;

        const strtDate = new Date(startDate);
        const dlnDate = new Date(deadlineDate);

        const profit = price - costs;

        const project = await connection('projects')
            .where('projectID', id)
            .first()
            .update({
                name, clients, description, price,
                costs, profit, startDate: strtDate.toLocaleDateString(), 
                deadlineDate: dlnDate.toLocaleDateString()
            })

        if ( project === 0 ){
            return response.status(404).json({ error: `ProjectID ${ id } not found!`})
        }

        return response.status(205).json(`Product ${ id } updated!`)
    },

    async delete(request, response){
        const { id } = request.params;

        const project = await connection('projects')
            .where('projectID', id)
            .first();

        if ( project === undefined ){
            return response.status(404).json({ error: `ProjectID ${ id } not found!`})
        }

        await connection('projects')
            .where('projectID', id)
            .delete()

        return response.redirect(200, '/projects');
    }
}