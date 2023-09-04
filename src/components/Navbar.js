import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function AppNavbar() {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">LOGO</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="">
                        <Link to={"/"} className=" px-2 link">Home</Link>
                        <Link to={"/cart"} className="px-2 link">Cart</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
