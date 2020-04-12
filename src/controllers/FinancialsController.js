const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { 
            projectsPage = 1,
            salesPage = 1,
            wagesPage = 1,
            productsPage = 1,
         } = request.query;

        const { startDate, endDate } = request.query;

        const allProjects = await connection('projects')
            .limit(5).offset((projectsPage - 1) * 5)
            .select('projectID','name','profit', 'startDate')
            .orderBy([{ column: 'startDate', order: 'desc' }, { column: 'profit', order: 'desc' }])
            .modify( function ( allProjects ){
                if ( startDate && endDate ){
                    const date1 = new Date(startDate);
                    const date2 = new Date(endDate);
                    allProjects.whereBetween('startDate', [date1.toLocaleString(), date2.toLocaleString()])
                }
            });
            
        const allSales = await connection('sales')
            .limit(5).offset((salesPage - 1 ) * 5)
            .select('saleID', 'productName', 'productID', 'amount', 'income', 'date')
            .orderBy([{ column: 'date', order: 'desc' }, { column: 'income', order: 'desc' }])
            .modify( function ( allSales ){
                if ( startDate && endDate ){
                    const date1 = new Date(startDate);
                    const date2 = new Date(endDate);
                    allSales.whereBetween('date', [date1.toLocaleString(), date2.toLocaleString()])
                }
            });
        
        const allWages = await connection('employees')
            .limit(5).offset((wagesPage - 1) * 5)
            .select('employeeId', 'name', 'job', 'wage')
            .orderBy('name');

        
        const allProducts = await connection('inventory')
            .limit(5).offset((productsPage - 1) * 5)
            .select('productID', 'name', 'amount', 'cost', 'arrival')
            .orderBy('dateArrival')
            .modify( function ( allProducts ){
                if ( startDate && endDate ){
                    const date1 = new Date(startDate);
                    const date2 = new Date(endDate);
                    allProducts.whereBetween('dateArrival', [date1.toLocaleString(), date2.toLocaleString()])
                }
            });
           
        response.status(200).json({ allProjects, allSales, allWages, allProducts });
    }
}