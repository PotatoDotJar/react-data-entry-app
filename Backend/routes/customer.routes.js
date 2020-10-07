module.exports = (app) => {
	const customers = require("../controllers/customer.controller");

	// Get new customer object
	app.get("/customers/new", customers.new);

	// Create a new customer
	app.post("/customers", customers.create);

	// Retrieve all Customers
	app.get("/customers", customers.findAll);

	// Retrieve a single Customer with customerId
	app.get("/customers/:customerId", customers.findOne);
  
	// Update a Customer with customerId
	app.put("/customers/:customerId", customers.update);
  
	// Delete a Customer with customerId
	app.delete("/customers/:customerId", customers.delete);
  
	// Create a new Customer
	app.delete("/customers", customers.deleteAll);
};