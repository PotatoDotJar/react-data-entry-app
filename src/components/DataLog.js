import React from 'react';
import ReactDOM from 'react-dom';

import { Button, Col, Row, Nav } from 'react-bootstrap';

class DataLog extends React.Component {

	constructor(props) {
		super(props);
	}


	componentDidMount() {
		console.log("Did mount");
	}

	componentWillUnmount() {
		console.log("Will unmount");
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