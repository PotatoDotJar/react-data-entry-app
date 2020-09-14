import React from 'react';
import ReactDOM from 'react-dom';

import { Button, Col, Row, Navbar, Nav, Form, FormControl } from 'react-bootstrap';

class Header extends React.Component {

	constructor(props) {
		super(props);
	}


	componentDidMount() {
		console.log("Did mount");
		console.log("CurrentPage", this.props.currentPage);
	}

	componentWillUnmount() {
		console.log("Will unmount");
	}


	render() {
		return (
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand>Statistics Data Entry App</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link>Data Log</Nav.Link>
					<Nav.Link>Data Entry</Nav.Link>
				</Nav>
			</Navbar>
		);
	}
}

export default Header;