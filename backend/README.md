# Helsinki City Bike App - Backend
This is a Node.js backend server for the Helsinki City Bike App. The server is configured to run on localhost port 3001 by default. Read the following steps to set up and run the project.

## Setting up node and npm
If you do not have node and npm installed on your machine, follow these steps [for installing node](https://nodejs.org/en/download/) and [for installing npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). If you do not have admin access to the operating system, you can also install node locally to a folder.

## Setting up the package
Run the command `npm install` in the root of the backend to install all the dependencies of the project.

## Placing data
Copy your .csv files to `./data` folder. 

## Setting up database configuration
This backend server uses [MongoDB](https://www.mongodb.com/) as database. You can sign up for a free cluster or install the database locally. Local install is recommended since the datasets may take too much space that exceeds the free disk storage. 

Once you have an empty cluster, copy a connection link. Create a [.env](https://www.npmjs.com/package/dotenv) file in the root of the backend. Create a variable `DB_URI` and assign the database connection link following this example: 

`DB_URI = 'mongodb://<username>:<password>@<server>/helsinki-city-bike-app?retryWrites=true&w=majority'`

## Configuring the backend server
File `congig.js` contains parameters for initialising and running the application. Make sure the following variables are set correctly:

* `DB_URI` - reference to a .env variable for connection to the database
* `PORT` - port that the backend server will be running on (3001 by default)
* `PATH_TO_STATIONS` - a valid string path to .csv file containing information about stations
* `PATHS_TO_JOURNEYS` - an array with string values that have valid paths to .csv files with journey entries
* `SPLIT_BUFFER_AT` - a value at which the entries will be split into packages and sent to the database. The larger the dataset the bigger number is preferred. For smaller datasets numbers under 10 are preferred to avoid data losses.

## .csv data format
.csv files must be formatted according to the values provided below. If the datasets are not formatted accordingly, the initialisation script will return an error. 

### Stations
Stations .csv must contain a header and the data must be in the following order.

| Column name | Data format | Required | Unique |
| ----------- | ----------- | -------- | ------ |
|  FID        |   Number    |   true   |  true  |
|  ID         |   Number    |   true   |  true  |
|  Nimi       |   String    |   true   |  false |
|  Namn       |   String    |   true   |  false |
|  Name       |   String    |   true   |  false | 
|  Osoite     |   String    |   true   |  false |
|  Adress     |   String    |   true   |  false |
|  Kaupunki   |   String    |   false  |  false |
|  Stad       |   String    |   false  |  false |
|  Operaattor |   String    |   false  |  false |
|  Kapasiteet |   Number    |   true   |  false |
|  x          |   Number    |   true   |  false |
|  y          |   Number    |   true   |  false |

### Journeys
Journey .csv is not required to have a header, however, data formats in the columns should still be in the following order and match the required formats.

| Column name            | Data format     | Required | Unique |
| ---------------------- | --------------- | -------- | ------ |
| departure              | Date (ISO 8601) |  true    | false  |
| return                 | Date (ISO 8601) |  true    | false  |
| departure_station_id   | Number          |  true    | false  |
| departure_station_name | String          |  false   | false  |
| return_station_id      | Number          |  true    | false  |
| return_station_name    | String          |  false   | false  |
| covered_distance       | Number          |  true    | false  |
| duration               | Number          |  true    | false  |

MongoDB will automatically create indexes for all the fields of journey collection to make the filtering faster. Keep in mind that indexing will affect the memory usage of the server.

## Uploading data to the database
Once all the configuration files are set, the initialisation script should be run. **Beware that the script will empty the existing collections in the database!** Run the following command to start the initialisation: 

### `npm run init`

The execution of the script may take a while for large datasets. Make sure that you have enough disk storage on the database server. 

## Alternative solution to file export
If the initialisation script fails for some reason, you can also use [mongoimport](https://www.mongodb.com/docs/database-tools/mongoimport/) command to import data to the database. Alternatively, [Mongo Atlas](https://www.mongodb.com/atlas) provides a GUI to import CSV files. 

## Starting the backend server
Once the data export is complete, start the server with the following command: 

### `npm start`

Test the server by making a GET request to http://localhost:3001/api/stations. A list of all the stations should be returned in JSON format. Submit another GET request to http://localhost:3001/api/journeys/ which should return a list of random journeys.
