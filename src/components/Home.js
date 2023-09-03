import { useEffect, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./styles.css"

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    const fetchApi = async (url) =>{
        const data = await fetch(url);
        const cData = await data.json();
        return cData;
    }

    const getCategories = async () => {
        const data = await fetchApi("https://fakestoreapi.com/products/categories");
        setCategories(data);
        
    }

    const getAllProducts = async () =>{
        const data = await fetchApi("https://fakestoreapi.com/products");
        setProducts(data);
    }

    const getCategoryProduct = async (category) =>{
        const data = await fetchApi(`https://fakestoreapi.com/products/category/${category}`);
        setProducts(data);
        setActiveCategory(category);
    }

    useEffect(() => {
        getCategories();
    }, []);

    useEffect(()=>{
        getAllProducts();
    },[]);

   

    return (
        <Container className="d-flex flex-column text-center justify-content-center">
            <Link to={"/"} className="link"><h1 className="p-4">E Commerce Website</h1></Link>

            <Row className="p-4">
                <Col className={`m-2 categories ${activeCategory === null ? 'activeCategory' : ''}`} onClick={getAllProducts}>All products</Col>
                {
                    categories?.map((element) => {
                        const category = element.charAt(0).toUpperCase() + element.slice(1);
                        return (
                            <Col key={element} className={`m-2 categories ${activeCategory === element ? 'activeCategory' : ''}`} onClick={()=>{getCategoryProduct(element);}}>{category}</Col>
                        )
                    }
                    )
                }
                
                <Col className={"m-2 categories"}><Link to={"/cart"} className="link">Cart</Link></Col>
            </Row>
            <Row>
                {
                    products?.map((product)=>{
                        return(
                            <Col xs={12} sm={6} md={4} lg={3}>
                                <Link to={`/product/${product.id}`} className="link">
                                <Card className="card m-2">
                                    <Card.Body>
                                        <Card.Img className="card-image" src={product.image}/>
                                            <Card.Title className="pt-4 card-title text-start">{product.title}</Card.Title>
                                            <Card.Text className="text-start">${product.price}</Card.Text>
                                    </Card.Body>
                                </Card>
                                </Link>
                                
                            </Col>
                            
                        )
                    })
                }
            </Row>
        </Container>
    )
}