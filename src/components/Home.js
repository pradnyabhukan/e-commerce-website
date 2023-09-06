import { useEffect, useRef, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { Triangle } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Footer from "./Footer";
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
    const productsTab = useRef(null)
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

    const scrollToProducts = () => {
        if (productsTab && productsTab.current) {
          const elementTopOffset = productsTab.current.getBoundingClientRect().top;
          const scrollOffset = 80; // Adjust the value to scroll a little lower
          window.scroll({
            top: window.scrollY + elementTopOffset - scrollOffset,
            behavior: 'smooth',
          });
        }
      };

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        getAllProducts();
    }, []);
    console.log(products)
    return (
        <div>
            {
                (products.length === 0) ? (
                    <div className="d-flex align-items-center text-center justify-content-center" style={{paddingTop : "10%"}}>
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
                ) : (
                    <Container className="d-flex flex-column text-center justify-content-center">
                        <Hero scroll = {scrollToProducts}/>
                        {
                            
                        }
                        <Row ref={productsTab} className="p-4">
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
        </div>
        
    )
}