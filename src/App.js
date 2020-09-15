import React from 'react';
import ReactDOM from 'react-dom';

import { Container } from 'react-bootstrap';

import Header from './components/Header';
import DataLog from './components/DataLog';
import DataEntry from './components/DataEntry';

const CurrentPageContext = React.createContext('DataLog');


class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentPage: "DataLog"
		};

		this.setCurrentPage = this.setCurrentPage.bind(this);
	}

	setCurrentPage(newPage) {
		console.log(newPage);
		this.setState({ currentPage: newPage });
	}

	render() {

		const _currentPage = this.state.currentPage;
		let currentPage;

		if(_currentPage === "DataLog") {
			currentPage = <DataLog />;
		}
		else if(_currentPage === "DataEntry") {
			currentPage = <DataEntry />
		}
		else {
			currentPage = <h1 className="color-error">Invalid State</h1>;
		}

		return (
			<CurrentPageContext.Provider value={_currentPage}>
				<Header currentPage={currentPage} setCurrentPage={this.setCurrentPage} />
				<Container>
					{currentPage}
				</Container>
			</CurrentPageContext.Provider>			
		);
	}
}

export default App;