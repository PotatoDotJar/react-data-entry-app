import React from 'react';
import ReactDOM from 'react-dom';

import { Container } from 'react-bootstrap';

import Header from './components/Header';
import DataLog from './components/DataLog';
import DataEntry from './components/DataEntry';

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentView: "DataLog"
		};

		this.setCurrentPage = this.setCurrentPage.bind(this);
	}

	setCurrentPage(newPage) {
		this.setState({ currentPage: newPage });
	}

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
			<div>
				<Header currentPage={currentPage} setCurrentPage={this.setCurrentPage} />
				<Container>
					{currentPage}
				</Container>
			</div>
			
		);
	}
}

export default App;