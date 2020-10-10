module.exports = (app) => {
	const statistics = require("../controllers/statistics.controller");

	app.get("/statistics/new", statistics.new);
	app.post("/statistics", statistics.create);
	app.get("/statistics/submittedToday", statistics.submittedToday);
	app.get("/statistics", statistics.findAll);
	app.get("/statistics/:statisticId", statistics.findOne);
	app.put("/statistics/:statisticId", statistics.update);
	app.delete("/statistics/:statisticId", statistics.delete);
};