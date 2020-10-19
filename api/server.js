const path = require('path');
const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

// Settings
const SERVER_PORT = process.env.PORT || 3001;

// Parse requests with content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../react-app/build')));

// Routes
require("./routes/statistics.routes")(app);

app.listen(SERVER_PORT, () => {
	console.log("Server running on port " + SERVER_PORT);
});