import React from 'react';
import ReactDOM from 'react-dom';

class DataEntry extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div>
				<h1 className="mt-5">Data Entry</h1>
				<p>This is data entry.</p>
			</div>
		)
	}
}

export default DataEntry;