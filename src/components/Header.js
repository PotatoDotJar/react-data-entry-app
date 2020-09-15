import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.setCurrentPage = this.setCurrentPage.bind(this);
	}


	componentDidMount() {
		console.log("Did mount");
	}

	componentWillUnmount() {
		console.log("Will unmount");
	}

	setCurrentPage(page) {
		this.props.setCurrentPage(page);
	}

	render() {

		let currentPage = this.context.;

		console.log(currentPage);

		return (
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand>Statistics Data Entry App</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link active={currentPage === "DataLog"} onClick={(e) => this.setCurrentPage("DataLog")}>Data Log</Nav.Link>
					<Nav.Link active={currentPage === "DataEntry"} onClick={(e) => this.setCurrentPage("DataEntry")}>Data Entry</Nav.Link>
				</Nav>
			</Navbar>
		);
	}
}

export default Header;