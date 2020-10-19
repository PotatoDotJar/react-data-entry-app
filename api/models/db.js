const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

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