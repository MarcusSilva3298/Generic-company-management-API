# Generic Company Management API 
API that helps to automate some basic compnay managements functions and needs.
A REST Client is required to use this API.
API gate - localhost:8000

## API Instances
The API has four main instances so far, which are: INVENTORY, PROJECTS, EMPLOYEES, SALES and FINANCES.

#### INVENTORY:
`/inventory`

Controls the flow of products from the company's inventory, controlling the entry, exit and alteration of any products. A generic product have the following informations:
    
    {
                   "productID": unique and indetification value,
        (editable) "name": name of the product,
        (editable) "mainCategory": main category of the product,
        (editable)(nullable) "subCategory": sub category of the product,
        (editable) "amount": amount of products in the invetory,
        (editable) "price": selling price,
        (editable) "cost": buying cost to the company,
        (editable) "sendCompany": company that send the product,
        (editable) "arrival": date and time of the product arrival, serves to form dateArrival and timeArrival
    }
 
#### EMPLOYEES:
`/employees`

Controls the company's employees. Allowing the creation, visualization, "firing" and updating all employees. A generic employee have the followings informations:

        {
                       "employeeID": unique and indetification value,
            (editable) "name": employee's name,
            (editable) "job": employee's position in the company,
            (editable) "wage": employee's wage,
            (editable) "department": departament that the employee works, 
        }
        

#### PROJECTS:
`/projects`

Controls the company's projects. Allowing the creation, visualization, finalization and updating all projects. A generic project have the followings informations:

        {
                       "projectID": unique and indetification value,
            (editable) "name": name of the project,
            (editable) "description": descrição do projeto,
            (editable) "startDate": start date of the project, 
            (editable) "deadlineDate": expected project end date,
            (editable) "clients": clients of the project,
            (editable) "price": project price,
            (editable) "cost": project costs to the company,
            (editable) "profit": price - costs
        }
        
        
#### SALES:
`/sales`

Controls the company's sales. Allowing the creation, visualization, deleting and updating all sales. A generic sale have the followings informations:

        {
                       "saleID": unique and indetification value,
            (editable) "productID": sold product's ID,
                       "productName": sold product's name,
            (editable) "amount": sold amount,
            (editable) "discount": discount given to the product on sale,
                       "income": price of the product * amount * discount,
            (editable)(nullable) "client": customer who bought the product,
            (editable) "date": date and time of the product sale, it serves to form saleDate and saleTime
            
        }

#### FINANCES:
`/finances`

Controls the company's finances. Allowing the visualization of every sale, project, wage of employee and products bought by the company. Every instance have its own pagination (salesPage, projectsPage, wagesPage, productsPage) and all itens can be filtered by date, once is provided a start (startDate) and end (endDate) date.

#### Methods:

All instances mentioned above, except for finances wich have only a `GET` method, have the following methods and follow this pattern:

1. Basic route, wich is mentioned under the title of each instance:
 * `GET`: serves to see all the itens created in each instance, only a few informations of each item can be seen to make a better visualization, it has a limit of 5 itens/page `/x?page=y`;
 * `POST`: serves to create a new item in each instance, to create a item is necesseray to provide all the infomations makerd with `(editable)` that was quoted above in each instance;
 
 2. Especifc route, routes that needed the id of an item `/x/:id`:
  * `GET`: serves to see all the informations of one specifc item;
  * `PUT`: serves to update one specifc item, is necessary to provide all the previous editable information of the item and change only the informations that needed to be updated;
  * `DELETE`: serves to delete one specifc item;
