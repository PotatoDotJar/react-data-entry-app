import React from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

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

	handleTimeChange(newTime) {
		this.setState({ wakeUpTime: newTime });
	}

	handleSubmit(event) {
		event.preventDefault();

		let data = {
			isWorkDay: this.state.isWorkDay,
			wakeUpTime: this.state.wakeUpTime.format(),
			notes: this.state.notes
		};

		this.props.submitLog(data);
	}

	render() {

		return (
			<form className="col-md-6" onSubmit={this.handleSubmit}>
				<h1 className="h3 mb-3 font-weight-normal text-center">Log Entry</h1>
				<div className="form-group form-check">
					<input id="isWorkDay" name="isWorkDay" type="checkbox"
						className="form-check-input" checked={this.state.isWorkDay}
						onChange={this.handleInputChange} />

					<label htmlFor="isWorkDay" className="form-check-label">
						Work Day
					</label>
				</div>
				
				<div className="form-group">
					<label htmlFor="wakeUpTime">Wake Up Time</label>
					<Datetime
						id="wakeUpTime"
						name="wakeUpTime"
						dateFormat={false}
						required={true}
						value={this.state.wakeUpTime}
						onChange={this.handleTimeChange} />
				</div>	
				<div className="form-group">
					<label htmlFor="notes">Notes</label>
					<textarea
						className="form-control"
						id="notes"
						name="notes"
						value={this.state.notes}
						onChange={this.handleInputChange}></textarea>
				</div>
				<input className="btn btn-primary w-100" type="submit" value="Submit" />
			</form>
		)
	}
}

export default function EntryScreen(props) {
	return (
		<div id="entryScreen" className="row justify-content-center">
			<EntryForm submitLog={props.submitLog} />
		</div>
	)
}