import React from 'react';
import ReactDOM from 'react-dom';

class DataLog extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div>
				<h1 className="mt-5">Data Log</h1>
				<p>This is data log.</p>
			</div>
		)
	}
}

export default DataLog;