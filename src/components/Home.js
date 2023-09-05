import { useEffect, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import Hero from "./Hero";
import Products from "./Products";
import "./styles.css"
<style>
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=Lora&family=Roboto:wght@300&display=swap');
</style>

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const fetchApi = async (url) => {
        const data = await fetch(url);
        const cData = await data.json();
        return cData;
    }
    const getCategories = async () => {
        const data = await fetchApi("https://fakestoreapi.com/products/categories");
        setCategories(data);
    }
    const getAllProducts = async () => {
        const data = await fetchApi("https://fakestoreapi.com/products");
        setProducts(data);
    }

    const getCategoryProduct = async (category) => {
        const data = await fetchApi(`https://fakestoreapi.com/products/category/${category}`);
        setProducts(data);
        setActiveCategory(category);
    }
    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Container className="d-flex flex-column text-center justify-content-center">
            <Hero />
            <Row className="p-4">
                <Col className={`m-2 categories ${activeCategory === null ? 'activeCategory' : ''}`} onClick={getAllProducts}>
                    <p>All products</p>
                </Col>
                {
                    categories?.map((element) => {
                        const category = element.charAt(0).toUpperCase() + element.slice(1);
                        return (
                            <Col key={element} className={`m-2 categories ${activeCategory === element ? 'activeCategory' : ''}`} onClick={() => { getCategoryProduct(element); }}>
                                <p>{category}</p>
                            </Col>
                        )
                    }
                    )
                }
            </Row>
            <Container className="d-flex flex-column text-center justify-content-center">
                <Row>
                    {
                        products?.map((product) =>
                            <Products product={product} />
                        )
                    }
                </Row>
            </Container>
        </Container>
    )
}