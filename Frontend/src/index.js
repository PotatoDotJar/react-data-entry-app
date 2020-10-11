import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import config from './config/appSettings.json';
import './style/index.css';

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
	}

	// Make ajax calls here
	componentDidMount() {
		this.checkLog();
	}

	checkLog() {
		var that = this;

		// Check if user has logged their status today
		axios.get(`${config.SERVER_URL}/statistics/submittedToday`)
			.then(function (response) {
				// handle success
				console.log(response);

				that.setState({
					hasGotStatus: true,
					logStatus: response.data
				});
			})
			.catch(function (error) {
				// handle error
				console.error(error);
			});
	}

	submitLog(data) {
		var that = this;

		axios.post(`${config.SERVER_URL}/statistics`, data)
			.then(function (response) {
				alert("Submitted!");

				// Clear status
				that.setState({
					hasGotStatus: false,
					logStatus: null
				}, function() {
					this.checkLog();
				});
			})
			.catch(function (error) {
				// handle error
				console.error(error);
			});
	}

	render() {
		let currentScreen;
		let currDayEntry = this.state.logStatus;

		// Screen logic
		if(currDayEntry !== null) {
			if(currDayEntry.hasBeenCreated) {
				currentScreen = <StatusScreen entry={currDayEntry} currDayId={currDayEntry.id} />;
			} else {
				currentScreen = <EntryScreen submitLog={this.submitLog} />;
			}
		} else {
			currentScreen = <LoadingScreen />;
		}

		return (
			<div className="application">
				{currentScreen}
			</div>
		);

	}
};


ReactDOM.render(
	<Application />,
	document.getElementById('root')
);