import { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartContext } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

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
        localStorage.setItem('cart', JSON.stringify(changeItem));

    }

    const handlePrice = () => {

        let total = 0;
        console.log(cart);
        cart.forEach(element => {
            total += (element.item.price * element.qty);
        });
        setPrice(total);
        console.log("handle price called: ", price);
    }

    const handleDelete = (index) => {
        const temp = [...cart];
        temp.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(temp));
        setCart(temp);
    }

    useEffect(() => {
        handlePrice();
    }, [cart])
    console.log(cart)
    return (
        <Container>
            <Row className="d-flex justify-content-between m-5">
                <Col><h1>Cart</h1></Col>
                <Col className="text-end">
                    <Link to="/" className="link"><h3>Home</h3></Link>
                </Col>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart?.map((item, i) => {
                        let product = item.item;
                        const isDeleted = deletedItem === i;
                        return (
                            
                            <tr key={i} className={isDeleted ? 'delete-horizontal-animation' : ''}>
                            <td>{i + 1}</td>
                            <td>{product.title}</td>
                            <td>${product.price}</td>
                            <td>
                              <ButtonGroup>
                                <Button
                                  variant="outline-primary"
                                  id="add"
                                  onClick={(e) => {
                                    handleQty(item, e);
                                  }}
                                >
                                  +
                                </Button>
                                <span className="m-2">{item.qty}</span>
                                <Button
                                  id="sub"
                                  variant="outline-primary"
                                  disabled={item.qty === 0}
                                  onClick={(e) => handleQty(item, e)}
                                >
                                  -
                                </Button>
                              </ButtonGroup>
                            </td>
                            <td>
                                <Button onClick={() => handleDeleteAnimation(i)}>Delete</Button>
                            </td>
                          </tr>
                        )
                    })}
                </tbody>
            </Table>

            <p>Total Price: ${price}</p>
        </Container>
    )
}