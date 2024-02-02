import React from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';

const styles = {
    media: {
      height: '260px',
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    cartActions: {
      justifyContent: 'space-between',
    },
    buttons: {
      display: 'flex',
      alignItems: 'center',
    },
  };

  
const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const handleUpdateCartQty = (lineItemId, newQuantity) => onUpdateCartQty(lineItemId, newQuantity);

  const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);

  return (
    <Card className="cart-item">
      <Row className="align-items-center">
        <Col md={4} className="text-center">
          <Image src={item.media.source} alt={item.name} fluid />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>{item.line_total.formatted_with_symbol}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Button variant="outline-secondary" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
            <span className="mx-2">{item.quantity}</span>
            <Button variant="outline-secondary" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
            <Button variant="danger" className="float-right" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
          </Card.Footer>
        </Col>
      </Row>
    </Card>
  );
};

export default CartItem;
