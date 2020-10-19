import React from 'react';
import moment from 'moment';
import axios from '../utilities/AxiosCustom';

// Grid of records
class DisplayGrid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gridData: []
		};
		
		this.deleteLog = this.deleteLog.bind(this);
	}

	componentDidMount() {
		var that = this;

		// Check if user has logged their status today
		axios.get("/statistics")
			.then(function (response) {
				that.setState({ gridData: response.data });
			})
			.catch(function (error) {
				// handle error
				console.error(error);
			});
	}

	deleteLog(id) {
		this.props.deleteLog(id);
	}

	render() {
		const tableData = this.state.gridData;
		const currDayId = this.props.currDayId;

		return (
			<table className="table table-sm">
				<thead>
					<tr>
						<th>ID</th>
						<th>Entry Date</th>
						<th>Wake Up Time</th>
						<th>Work Day</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{ tableData.map(entry => <DisplayGridRow key={entry.id} today={entry.id === currDayId} entry={entry} deleteLog={this.deleteLog} />) }
				</tbody>
			</table>
		)
	}
}

// Every grid row
function DisplayGridRow(props) {
	const isToday = props.today;

	const entryDt = moment.utc(props.entry.entryDateTime).local();
	const wakeUpDt = moment.utc(props.entry.wakeUpDateTime).local();

	return (
		<tr className={ (isToday) ? "table-primary" : "" }>
			<td>{props.entry.id}</td>
			<td>{entryDt.format('MMM Do YY, h:mm:ss a')}</td>
			<td>{wakeUpDt.format('h:mm:ss a')}</td>
			<td>{(props.entry.isWorkDay) ? "Yes" : "No"}</td>
			<td><button className="btn btn-danger" onClick={() => { props.deleteLog(props.entry.id) }}>Remove</button></td>
		</tr>
	)
}

// Status screen
export default function StatusScreen(props) {

	const entryDt = moment.utc(props.entry.entryDateTime).local();
	const wakeUpDt = moment.utc(props.entry.wakeUpDateTime).local();

	return (
		<div className="statusScreen">
			<h1>Today's Log</h1>

			<dl>
				<dt>ID</dt>
				<dd>{props.entry.id}</dd>

				<dt>Time entered</dt>
				<dd>{entryDt.format('h:mm:ss a')}</dd>

				<dt>Wake up time</dt>
				<dd>{wakeUpDt.format('h:mm:ss a')}</dd>

				<dt>Work day</dt>
				<dd>{(props.entry.isWorkDay) ? "Yes" : "No"}</dd>

				<dt>Notes</dt>
				<dd>{(props.entry.notes) ? props.entry.notes : "N/A"}</dd>
			</dl>

			<div className="table-wrap">
				<DisplayGrid currDayId={props.currDayId} deleteLog={props.deleteLog} />
			</div>
		</div>
	)
}