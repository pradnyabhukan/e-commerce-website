import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import heroimage from '../hero-image.png'

function HeroComponent() {
  return (
    <Container fluid className="hero-container">
      <Row className="hero-row">
        <Col sm={6}>
          <div className="">
            <h3>Welcome to</h3>
            <Link to={"/"} className="link">
              <h1 className="p-4 hero-title">ShopNest</h1>
            </Link>
            <p>Find the best deals on our products.</p>
            <Button variant="warning" className='m-4'>Shop Now</Button>
          </div>
        </Col>
        <Col sm={6}>
          <div className="">
            <img src={heroimage} alt="E-commerce" className="hero-image"/>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HeroComponent;
