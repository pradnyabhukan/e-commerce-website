// import { useEffect, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
// import Hero from "./Hero";
import "./styles.css"
<style>
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=Lora&family=Roboto:wght@300&display=swap');
</style>

export default function Products({ product }) {

    return (
        <Col xs={12} sm={6} md={6} lg={3}>
            <Link to={`/product/${product?.id}`} className="link">
                <Card className="card m-3" >
                    <Card.Body>
                        <Card.Img className="card-image" src={product?.image} />
                        <Card.Title className="pt-4 card-title text-start"><p>{product?.title}</p></Card.Title>
                        <Card.Text className="text-start"><p>${product?.price}</p></Card.Text>
                    </Card.Body>
                </Card>
            </Link>

        </Col>
    )
}