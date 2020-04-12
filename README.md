Generic Company Management API its an API that helps to automate some basic compnay managements functions and needs.
A REST Client is required to use this API.
API gate - localhost:8000

The API has four main instances so far, which are: INVENTORY, PROJECTS, EMPLOYEES, SALES and FINANCES.

INVENTORY:
    Controls the flow of products from the company's inventory, controlling the entry, exit and alteration of any products. A generic product have the following informations:
        {
            "productID": unique and indetification value,
            "name": name of the product,
            "mainCategory": main category of the product,
            "subCategory": sub category of the product,
            "amount": amount of products in the invetory,
            "price": selling price,
            "cost": buying cost to the company,
            "sendCompany": company that send the product,
            "dateArrival": date of the product arrival,
            "timeArrival": time of the product arrival
        }

    To CREATE a product is necessary to go to  `/inventory` route with a POST method and insert:
        {
            "name": ,
            "mainCategory": ,
            "subCategory": ,
            "amount": ,
            "price": ,
            "cost": ,
            "sendCompany": ,
            "arrival":
        }

    To SEE ALL product is necessary to go to `/inventory?page=1` route with a GET method, the limit of itens/page its 5.

    OBS: all of the following routes will need the ID of the product, the id can be found seeing all products and when a new product is created.

    To SEE A product is necessary to go to `/inventory/:id` route with a GET method.

    To UPDATE a product is necessary to go to `/inventory/:id` route with a PUT method. The changeable informations of the product are the same of the creation of the product.

    To DELETE a product is necessary to go to `/inventory/:id` route with a delete method.


PROJECTS:
    Controls the company's projects. Allowing the creation, visualization, finalization and updating all projects.
        {
            "projectID": unique and indetification value,
            "name": name of the project,
            "description": descrição do projeto,
            "startDate": start date of the project,
            "deadlineDate": expected project end date,
            "clients": clients of the project,
            "price": project price,
            "cost": project costs to the company,
            "profit": price - costs
        }

    To CREATE a product is necessary to go to  `/projects` route with a POST method and insert:
        {
            "name": ,
            "description": ,
            "startDate": ,
            "deadlineDate": ,
            "clients": ,
            "price": ,
            "cost": ,
            "profit":
        }

    To SEE ALL projects is necessary to go to `/projects?page=1` route with a GET method, the limit of itens/page its 5.

    OBS: all of the following routes will need the ID of the projects, the id can be found seeing all projects and when a new project is created.

    To SEE A SPECIFIC project is necessary to go to `/projects/:id` route with a GET method.

    To UPDATE a specific product is necessary to go to `/projects/:id` route with a PUT method. The changeable informations of the product are the same of the creation of the product.

    To DELETE a product is necessary to go to `/projects/:id` route with a delete method.
