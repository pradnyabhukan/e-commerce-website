import { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartContext } from "../App";

export default function Cart() {

    const [price, setPrice] = useState(0);
    const { cart, setCart } = useContext(CartContext);
    const [deletedItem, setDeletedItem] = useState(null);

    const handleDeleteAnimation = (index) => {
        setDeletedItem(index);
        setTimeout(() => {
            handleDelete(index);
            setDeletedItem(null);
        }, 1000); // Adjust the duration as needed
    };

    const handleQty = (item, e) => {
        const action = e.currentTarget.getAttribute("id");
        let changeItem = cart.map((product) => {
            if (item.item === product.item) {
                if (action === "add") {
                    return { ...product, qty: product.qty + 1 }
                } else if (action === "sub") {
                    return { ...product, qty: product.qty - 1 }
                }
            } else {
                return product;
            }
        });
        setCart(changeItem);
        window.sessionStorage.setItem('cart', JSON.stringify(changeItem));

    }

    const handlePrice = () => {

        let total = 0;
        console.log(cart);
        cart.forEach(element => {
            total += (element.item.price * element.qty);
        });
        total = parseFloat(total.toFixed(3));
        setPrice(total);
        console.log("handle price called: ", price);
    }

    const handleDelete = (index) => {
        const temp = [...cart];
        temp.splice(index, 1);
        window.sessionStorage.setItem('cart', JSON.stringify(temp));
        setCart(temp);
    }

    useEffect(() => {
        handlePrice();
    }, [cart])
    console.log(cart)
    return (
        <Container className="pt-5">
            {/* <div className="text-center p-4">
                <h1>Cart</h1>
            </div> */}
            {
                (cart.length === 0) ? (
                    <div className="container text-center">
                        <h3>Looks like your cart is empty!</h3>
                        <Button variant="warning"><Link to={"/"} className="link">Start Shopping</Link></Button>
                    </div>
                )
                    : (
                        <div>
                            <Container className="cart p-5">
                                <Row>
                                    <Col lg={8} md={8} sm={12} xs={12} className=" ">
                                        <Row>
                                            <Col><h3 className="mb-5">Shopping Cart</h3></Col>
                                            <Col><p className="summary-text text-end px-5"> {cart?.length} Items</p></Col>
                                        </Row>
                                        <Table className="custom-table ">
                                            <thead>
                                                <tr className="">
                                                    <th>#</th>
                                                    <th>NAME</th>
                                                    <th>PRICE</th>
                                                    <th>QUANTIY</th>
                                                    <th>DELETE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cart?.map((item, i) => {
                                                        let product = item.item;
                                                        const isDeleted = deletedItem === i;
                                                        return (

                                                            <tr key={i} className={isDeleted ? 'delete-horizontal-animation' : ''}>
                                                                <td >{i + 1}</td>
                                                                <td>{product.title}</td>
                                                                <td>${product.price}</td>
                                                                <td>
                                                                    <ButtonGroup>
                                                                        <Button
                                                                            variant="outline-warning"
                                                                            id="sub"
                                                                            onClick={(e) => {
                                                                                handleQty(item, e);
                                                                            }}
                                                                        >
                                                                            -
                                                                        </Button>
                                                                        <span className="m-2">{item.qty}</span>
                                                                        <Button
                                                                            id="add"
                                                                            variant="outline-warning"
                                                                            disabled={item.qty === 0}
                                                                            onClick={(e) => handleQty(item, e)}
                                                                        >
                                                                            +
                                                                        </Button>
                                                                    </ButtonGroup>
                                                                </td>
                                                                <td>
                                                                    <Button variant="warning" onClick={() => handleDeleteAnimation(i)}>Delete</Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col lg={3} md={3} sm={12} xs={12} className="column-spacing">
                                        <h3 className="mb-5">Order summary</h3>
                                        <Row>
                                            <p className="summary-text" style={{ margin: "0" }}>Items: {cart.length}</p>
                                            <p className="summary-text" style={{ margin: "0" }}>Total Cost: $ {price}</p>
                                        </Row>

                                        <Row className="pt-3">
                                            <p className="summary-text" style={{ margin: "0" }}>SHIPPING</p>
                                            <p className="summary-text">Standard Shipping : $08</p>
                                        </Row>
                                        <Row>
                                            <p className="summary-text">Total Cost : $ {price + 8}</p>
                                            <Button variant="warning">CHECKOUT</Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                            <Container className="mt-5 d-flex justify-content-center">
                                <Button variant="warning">
                                    <Link to={"/"} className=" px-2 link">
                                        Continue Shopping
                                    </Link>
                                </Button>
                            </Container>
                        </div>
                    )
            }

        </Container>
    )
}