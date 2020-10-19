const moment = require("moment");
const { commit } = require("../models/db");
const Statistic = require("../models/statistics.model");

exports.new = (req, res) => {
	let newStatistic = new Statistic({
		isWorkDay: false,
		wakeUpDateTime: moment().utc(),
		entryDateTime: moment().utc(),
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

	let entryDateTime = moment().utc();
	let wakeUpTime = moment(req.body.wakeUpTime).utc();

	console.log(entryDateTime);
	console.log(wakeUpTime);

	wakeUpTime.set({
		'year': entryDateTime.get('year'),
		'month': entryDateTime.get('month'),
		'date': entryDateTime.get('date')
	});
	
	const statistic = new Statistic({
		isWorkDay: req.body.isWorkDay,
		// Format dates in UTC MySQL format
		wakeUpDateTime: wakeUpTime.format("YYYY-MM-DD HH:mm:ss"),
		entryDateTime: entryDateTime.format("YYYY-MM-DD HH:mm:ss"),
		notes: req.body.notes
	});

	Statistic.create(statistic, (err, data) => {
		if (err) {
			if (err.kind === "already_created") {
				res.status(400).send({
					message: "An entry has already been submitted today."
				});
			} else {
				res.status(500).send({
					message: err.message || "Some error occurred while creating the Statistic."
				});
			}
		} else {
			res.send(data);
		}
	});
};

exports.submittedToday = (req, res) => {
	Statistic.wasSubmittedToday((err, data) => {
		if (err) {
			res.status(500).send({
				message: err.message || "Some error occurred while checking if a statistic was submitted today."
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