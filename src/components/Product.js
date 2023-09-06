import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Triangle } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { CartContext } from "../App";
import Products from "./Products";

export default function Product() {
    const { id } = useParams();
    const [isAdded, setIsAdded] = useState(false);
    const [product, setProduct] = useState();
    const [similarProducts, setSimilarProducts] = useState([]);
    const { cart, setCart } = useContext(CartContext);
    const getProduct = async () => {
        const data = await fetch(`https://fakestoreapi.com/products/${id}`);
        const pData = await data.json();
        setProduct(pData);
        getCategoryProduct(pData.category)
    }

    const handleAddToCart = () => {
        if (!isAdded) {
            const cart = JSON.parse(window.sessionStorage.getItem('cart'));
            const addItem = [...cart, { item: product, qty: 1 }];
            window.sessionStorage.setItem('cart', JSON.stringify(addItem));
            setCart(addItem);
        }
        setIsAdded(true);

    }

    const getCategoryProduct = async (c) => {
        console.log("called")
        const data = await fetch(`https://fakestoreapi.com/products/category/${c}`);
        const sData = await data.json();
        const filteredProducts = sData.filter((item) => item.id!= id );
        const limitProducts = filteredProducts.slice(0, 4);
        setSimilarProducts(limitProducts);
    }

    useEffect(() => {
        getProduct();
        getCategoryProduct(product?.category);
    }, [id]);

    const totalStars = 5;
    const filledStars = Math.round(product?.rating?.rate);
    console.log(product);

    return (
        <div>
            {
            (product === undefined) ? (
                <div className="d-flex justify-content-center" style={{paddingTop : "10%"}}>
                        <Triangle 
                            height="80"
                            width="80"
                            color="#ffc107"
                            ariaLabel="triangle-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                    </div>
            ) 
            :(
                <Container className="py-5 d-flex flex-column text-center align-items-center justify-content-center">
                    <Row className="py-5">
                        <Col lg={1}></Col>
                        <Col >
                            <Image className="product-image" src={product?.image}></Image>
                        </Col>
                        <Col className="text-start">
                            <p className="product-category-heading">{(product?.category)}</p>
                            <h3 className="">{product?.title}</h3>
                            <Row>
                                <Col>
                                    <div className="starRating">
                                        {[...Array(totalStars)].map((_, index) => (
                                            <span
                                                key={index}
                                                className={index < filledStars ? "starFilled" : "starEmpty"}
                                            >
                                                ★
                                            </span>

                                        ))}
                                        <p style={{ fontSize: "15px" }}>{product?.rating?.rate} / 5</p>
                                    </div>
                                </Col>
                                <Col>
                                    <p className="reviews">{product?.rating?.count} Reviews</p>
                                </Col>
                            </Row>

                            <p>{product?.description}</p>
                            <p>Price : ${product?.price}</p>
                            <Button variant="warning" onClick={handleAddToCart} className={isAdded ? 'added-to-cart' : ''}>{isAdded ? 'Added to Cart!' : 'Add to Cart'}</Button>
                        </Col>
                        <Col lg={1}></Col>
                    </Row>
                    <Row>
                        <h3 className="py-4">View Similar Products</h3>
                        <Container className="d-flex flex-column text-center justify-content-center">
                            <Row>
                                {
                                    similarProducts?.map((product) =>
                                        <Products product={product}/>
                                    )
                                }
                            </Row>
                    </Container>
                    </Row>
                </Container>
            )
        }
        </div>
        
    )
}