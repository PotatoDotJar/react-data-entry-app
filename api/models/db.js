const mysql = require("mysql");
const dotenv = require('dotenv');
const dbConfig = require("../config/db.config");
const prodDbConfig = require("../config/db.prod.config");

dotenv.config()
let conf = {};

if(!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
	// Load dev config
	conf = dbConfig;
} else {
	conf = prodDbConfig;
}

// Create a connection to the database
const connection = mysql.createConnection(conf);

// Open the connection
connection.connect(error => {
	if (error) {
		throw error;
	}

	connection.query("SET time_zone='+00:00';", error => {
        if(error){
            throw error
        }
    })
	console.log("Successfully connected to the database.");
});


module.exports = connection;