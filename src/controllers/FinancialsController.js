const connection = require('../database/connection')

module.exports = {
    async index(request, response){
        const { ProjectsPage = 1, 
            SalesPage = 1, 
            WagesPage = 1, 
            ProductsPage = 1 } = request.query;
        
        const { month } = request.query;

        const Allprojects = await connection('projects')
            .limit(5).offset((ProjectsPage - 1) * 5)
            .select('projectID','name','profit', 'startDate')
            .orderBy('profit', 'desc')
            .groupBy('startDate')
            

        const Allsales = await connection('sales')
            .limit(5).offset((SalesPage - 1) * 5)
            .select('saleID', 'productName', 'productID', 'amount', 'income', 'date')
            .orderBy('income', 'desc')
            .groupBy('date');

        const Allwages = await connection('employees')
            .limit(5).offset((WagesPage - 1) * 5)
            .select('employeeId', 'name', 'job', 'wage')
            .orderBy('name');

        
        const Allproducts = await connection('inventory')
            .limit(5).offset((ProductsPage - 1) * 5)
            .select('productID', 'name', 'amount', 'cost', 'arrival')
            .orderBy('arrival');

        response.status(200).json({ Allprojects, Allsales, Allwages, Allproducts })
    }
}