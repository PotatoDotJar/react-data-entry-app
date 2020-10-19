import React from 'react';
import moment from 'moment';
import axios from 'axios';

import config from '../config/appSettings.json';

// Grid of records
class DisplayGrid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gridData: []
		};
	}

	componentDidMount() {
		var that = this;

		// Check if user has logged their status today
		axios.get(`${config.SERVER_URL}/statistics`)
			.then(function (response) {
				// handle success
				console.log(response);

				that.setState({ gridData: response.data });
			})
			.catch(function (error) {
				// handle error
				console.error(error);
			});
	}

	render() {
		const tableData = this.state.gridData;
		const currDayId = this.props.currDayId;

		return (
			<table className="displayGrid">
				<thead>
					<tr>
						<th>ID</th>
						<th>Entry Date</th>
						<th>Wake Up Time</th>
						<th>Did RJ go to work?</th>
					</tr>
				</thead>
				<tbody>
					{ tableData.map(entry => <DisplayGridRow key={entry.id} highlighted={entry.id === currDayId} entry={entry} />) }
				</tbody>
			</table>
		)
	}
}

// Every grid row
function DisplayGridRow(props) {
	const highlighted = props.highlighted;

	const entryDt = moment.utc(props.entry.entryDateTime).local();
	const wakeUpDt = moment.utc(props.entry.wakeUpDateTime).local();

	return (
		<tr className={ (highlighted) ? "highlighted" : "" }>
			<td>{props.entry.id}</td>
			<td>{entryDt.format('MMM Do YY, h:mm:ss a')}</td>
			<td>{wakeUpDt.format('h:mm:ss a')}</td>
			<td><input type="checkbox" disabled checked={props.entry.isWorkDay} /></td>
		</tr>
	)
}

// Status screen
export default function StatusScreen(props) {

	const entryDt = moment.utc(props.entry.entryDateTime).local();
	const wakeUpDt = moment.utc(props.entry.wakeUpDateTime).local();

	return (
		<div className="statusScreen">
			<h1>Status</h1>
			<h3>You've already logged today.</h3>
			<ul className="entryInfo">
				<li><strong>ID: </strong>{props.entry.id}</li>
				<li><strong>Time entered: </strong>{entryDt.format('h:mm:ss a')}</li>
				<li><strong>Wake up time: </strong>{wakeUpDt.format('h:mm:ss a')}</li>
				<li><strong>Did RJ go to work? </strong><input type="checkbox" disabled checked={props.entry.isWorkDay} /></li>
				<li>
					<strong>Notes: </strong><br />
					<textarea disabled value={props.entry.notes}></textarea>
				</li>
			</ul>

			<DisplayGrid currDayId={props.currDayId} />
		</div>
	)
}