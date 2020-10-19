import React from 'react';
import ReactDOM from 'react-dom';
import axios from './utilities/AxiosCustom';

// Styling
import './style/index.scss';

// Components
import LoadingScreen from './components/LoadingScreen';
import StatusScreen from './components/StatusScreen';
import EntryScreen from './components/EntryScreen';

class Application extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasGotStatus: false,
			logStatus: null
		};

		this.checkLog = this.checkLog.bind(this);
		this.submitLog = this.submitLog.bind(this);
		this.deleteLog = this.deleteLog.bind(this);
	}

	// Make ajax calls here
	componentDidMount() {
		this.checkLog();
	}

	checkLog() {
		var that = this;

		// Check if user has logged their status today
		axios.get("/statistics/submittedToday")
			.then(function (response) {
				that.setState({
					hasGotStatus: true,
					logStatus: response.data
				});
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	submitLog(data) {
		var that = this;

		axios.post("/statistics", data)
			.then(function (response) {
				alert("Submitted!");

				that.setState({
					hasGotStatus: false,
					logStatus: null
				}, function () {
					this.checkLog();
				});
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	deleteLog(id) {
		let that = this;

		let confirmed = window.confirm("Are you sure you want to delete?");

		if (confirmed) {
			axios.delete("/statistics/" + id)
				.then(function (response) {
					alert("Entry deleted.");

					that.setState({
						hasGotStatus: false,
						logStatus: null
					}, function () {
						that.checkLog();
					});

				})
				.catch(function (error) {
					console.error(error);
				});
		}
	}

	render() {
		let currentScreen;
		let currDayEntry = this.state.logStatus;

		// Screen logic
		if (currDayEntry !== null) {
			if (currDayEntry.hasBeenCreated) {
				currentScreen = <StatusScreen entry={currDayEntry} currDayId={currDayEntry.id} deleteLog={this.deleteLog} />;
			} else {
				currentScreen = <EntryScreen submitLog={this.submitLog} />;
			}
		} else {
			currentScreen = <LoadingScreen />;
		}

		return (
			<div className="container pt-3">
				{currentScreen}
			</div>
		);

	}
};


ReactDOM.render(
	<Application />,
	document.getElementById('root')
);