import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { CartContext } from "../App";

export default function Product(){
    const { id } = useParams();
    const [isAdded, setIsAdded] = useState(false);
    const [product, setProduct] = useState();
    const {cart, setCart} = useContext(CartContext);
    const getProduct = async() =>{
        const data = await fetch(`https://fakestoreapi.com/products/${id}`);
        const pData = await data.json();
        setProduct(pData);
    }

    const handleAddToCart = () =>{
        if(!isAdded){
            const cart = JSON.parse(localStorage.getItem('cart'));
            const addItem = [...cart, {item : product, qty : 1}];
            localStorage.setItem('cart', JSON.stringify(addItem));
            setCart(addItem);
        }
        setIsAdded(true);

    }

    useEffect(()=>{
        getProduct();
    }, [])
    console.log(product);

    return(
        <Container className="d-flex flex-column text-center align-items-center justify-content-center">
            <Link to={"/"} className="link"><h1 className="p-4">E Commerce Website</h1></Link>
            <Row className=" mt-5 pt-5 align-items-center">
                <Col>
                    <Image className="product-image" src={product?.image}></Image>
                </Col>
                <Col className="text-start">
                    <h3>{product?.title}</h3>
                    <p>Price : ${product?.price}</p>
                    <p>{product?.description}</p>
                    <p>Category : {product?.category}</p>
                    <p> Rating : {product?.rating?.rate} / 5</p>
                    <Button onClick={handleAddToCart} className={isAdded ? 'added-to-cart' : ''}>{isAdded ? 'Added to Cart!' : 'Add to Cart'}</Button>
                    {isAdded && (
                        <div className="pt-3 px-1">
                        <Link to={"/cart"} className="link">Go to cart</Link>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    )
}