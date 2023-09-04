import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import "./styles.css"

export default function AppNavbar() {
    return (
        <Navbar className="bg-body-tertiary " data-bs-theme="light">
            <Container>
                <Navbar.Brand><Link to={"/"} className=" px-2 link">ShopNext</Link></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="">
                        <Link to={"/cart"} className="px-2 link">Cart</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
