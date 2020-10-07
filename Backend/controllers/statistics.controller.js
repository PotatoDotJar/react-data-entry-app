const moment = require("moment");
const Statistic = require("../models/statistics.model");

exports.new = (req, res) => {
	let newStatistic = new Statistic({
		isWorkDay: false,
		wakeUpDateTime: new Date(),
		entryDateTime: new Date(),
		notes: ""
	});

	res.send(newStatistic);
}

exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	const statistic = new Statistic({
		isWorkDay: req.body.isWorkDay,
		// Format dates in MySQL format
		wakeUpDateTime: moment(req.body.wakeUpDateTime).format("YYYY-MM-DD HH:mm:ss"),
		entryDateTime: moment(req.body.entryDateTime).format("YYYY-MM-DD HH:mm:ss"),
		notes: req.body.notes
	});

	Statistic.create(statistic, (err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Statistic."
			});
		} else {
			res.send(data);
		}
	});
};

exports.findAll = (req, res) => {
	Statistic.getAll((err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving statistics."
			});
		} else {
			res.send(data);
		}
	});
};

exports.findOne = (req, res) => {
	Statistic.findById(req.params.statisticId, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Statistic with id ${req.params.statisticId}.`
				});
			} else {
				res.status(500).send({
					message: `Error retrieving Statistic with id ${req.params.statisticId}.`
				});
			}
		} else {
			res.send(data);
		}
	});
};

exports.update = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
	}

	Statistic.updateById(
		req.params.statisticId,
		new Statistic(req.body),
		(err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Not found Statistic with id ${req.params.statisticId}.`
					});
				} else {
					res.status(500).send({
						message: `Error updating Statistic with id ${req.params.statisticId}.`
					});
				}
			} else {
				res.send(data);
			}
		}
	);
};

exports.delete = (req, res) => {
	Statistic.remove(req.params.statisticId, (err, data) => {
		if (err) {
			if (err.kind === "not_found") {
				res.status(404).send({
					message: `Not found Statistic with id ${req.params.statisticId}.`
				});
			} else {
				res.status(500).send({
					message: `Could not delete Statistic with id ${req.params.statisticId}.`
				});
			}
		} else {
			res.send({ message: `Statistic was deleted successfully!` });
		}
	});
};