import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <footer className="custom-footer text-dark mt-5 pt-4 text-start px-5">
      <Container className="text-start px-5">
        <Row>
          <Col md={4}>
            <h5>Contact Us</h5>
            <ul className="quick-links-list">
              <li>
              Email: contact@example.com
              </li>
              <li>
              Phone: +1 (999) 999-9999
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="quick-links-list">
              <li>
                <Link to={"/"} className="link" onClick={scrollToTop}>Home</Link>
              </li>
              <li>
              <Link to={"/"} className="link" onClick={scrollToTop}>Products</Link>
              </li>
              <li>
              <Link to={"/cart"} className="link">Cart</Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Follow Us</h5>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fa fa-instagram"></i>
                </a>
              </li>
            </ul>
          </Col>
          <Col md={1}>
            <Link className="link" onClick={scrollToTop}>
              <FontAwesomeIcon icon={faArrowUp} /> 
            </Link>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <p className="text-center">&copy; {new Date().getFullYear()} ShopNest</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
