const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");


const app = express();

// Settings
const SERVER_PORT = process.env.PORT || 3001;

// Parse requests with content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../react-app/build')));

// Routes
require("./routes/customer.routes")(app);
require("./routes/statistics.routes")(app);

app.listen(SERVER_PORT, () => {
	console.log("Server running on port " + SERVER_PORT);
});