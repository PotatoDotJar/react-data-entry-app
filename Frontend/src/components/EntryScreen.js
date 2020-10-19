import React from 'react';
import moment from 'moment';

import TimePicker from 'react-time-picker';

class EntryForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isWorkDay: false,
			wakeUpTime: moment(),
			notes: ""
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleTimeChange = this.handleTimeChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleTimeChange(time) {
		console.log(time);

		let wakeUpTime = this.state.wakeUpTime;

		let splitTime = time.split(":");
		wakeUpTime.hour(parseInt(splitTime[0]));
		wakeUpTime.minute(parseInt(splitTime[1]));
		wakeUpTime.second(parseInt(splitTime[2]));

		this.setState({
			wakeUpTime: wakeUpTime
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		let data = {
			isWorkDay: this.state.isWorkDay,
			wakeUpTime: this.state.wakeUpTime,
			notes: this.state.notes
		};

		this.props.submitLog(data);
	}

	render() {

		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Is it a work day for RJ?
					<input
						name="isWorkDay"
						type="checkbox"
						checked={this.state.isWorkDay}
						onChange={this.handleInputChange} />
				</label>
				<br />
				<label>
					Wake Up Time:
					<TimePicker
						name="wakeUpTime"
						maxTime={moment().format("HH:mm:ss")}
						maxDetail="second"
						required={true}
						value={this.state.wakeUpTime.format("HH:mm:ss")}
						onChange={this.handleTimeChange} />
					
				</label>
				<br />
				<label>
					Notes:
					<textarea
						name="notes"
						value={this.state.notes}
						onChange={this.handleInputChange}></textarea>
					
				</label>
				<input type="submit" value="Submit" />
			</form>
		)
	}
}

export default function EntryScreen(props) {
	return (
		<div className="entryScreen">
			<h1>Log Entry</h1>
			<EntryForm submitLog={props.submitLog} />
		</div>
	)
}