import React from 'react';
import ReactDOM from 'react-dom';

import { Container } from 'react-bootstrap';

import DataLog from './components/DataLog';
import DataEntry from './components/DataEntry';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentView: "DataLog"
		};
	}

	// setCurrentView(currentView) {
	// 	this.setState()
	// }

	render() {

		const currentView = this.state.currentView;
		let currentPage;

		if(currentView === "DataLog") {
			currentPage = <DataLog />;
		}
		else if(currentView === "DataEntry") {
			currentPage = <DataEntry />
		}
		else {
			currentPage = <h1 className="error">Invalid State</h1>;
		}

		return (
			<Container>
				{currentPage}
			</Container>
		);
	}
}

export default App;