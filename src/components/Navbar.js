import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import "./styles.css"
import { CartContext } from '../App';

export default function AppNavbar() {
    const { cart, setCart } = useContext(CartContext);
    return (
        <Navbar className="bg-body-tertiary " data-bs-theme="light">
            <Container>
                <Navbar.Brand><Link to={"/"} className=" px-2 link">ShopNest</Link></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="">
                        <Link to={"/cart"} className="px-2 link"> 🛒 Cart {cart.length > 0 && <span className="badge">{cart.length}</span>}</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
