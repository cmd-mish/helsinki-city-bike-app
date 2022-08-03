# Helsinki City Bike App - Backend
This is a Node.js backend server for the Helsinki City Bike App. The server is configured to run on port 3001 by defauld. Please, read the following steps to set up and run the project.

## Setting up node and npm
If you do not have node and npm installed on your machine, follow these steps [for installing node](https://nodejs.org/en/download/) and [for installing npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). If you do not have admin access to the operating system, you can also install node locally to a folder.

## Setting up the package
Run command `npm install` in the root of the backend to install all the dependensies of the project.

## Placing data
Copy your .csv files to `./data` folder. 

## Setting up database configuration
This backend server uses [MongoDB](https://www.mongodb.com/) as a database. You can sign up for a free cluster or install the database locally. Local install is recommended since the datasets may take too much space. 

Once you have an empty cluster, copy a connection link. Create a [.env](https://www.npmjs.com/package/dotenv) file in the root folder of the backend. Create a variable `DB_URI` and assign the database connection link following this example: 

`DB_URI = 'mongodb://<username>:<password>@<server>/helsinki-city-bike-app?retryWrites=true&w=majority'`