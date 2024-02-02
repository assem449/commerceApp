import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const handleEmptyCart = () => onEmptyCart();

  const renderEmptyCart = () => (
    <p className="subtitle">You have no items in your shopping cart,
      <Link to="/" className="link">start adding some</Link>!
    </p>
  );

  if (!cart.line_items) return 'Loading';

  const renderCart = () => (
    <>
      <Row>
        {cart.line_items.map((lineItem) => (
          <Col xs={12} sm={4} key={lineItem.id}>
            <CartItem item={lineItem} onUpdateCartQty={onUpdateCartQty} onRemoveFromCart={onRemoveFromCart} />
          </Col>
        ))}
      </Row>
      <div className="card-details">
        <p className="subtotal">Subtotal: {cart.subtotal.formatted_with_symbol}</p>
        <div>
          <Button className="empty-button" size="lg" type="button" variant="secondary" onClick={handleEmptyCart}>Empty cart</Button>
          <Button className="checkout-button" as={Link} to="/checkout" size="lg" type="button" variant="primary">Checkout</Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className="toolbar" />
      <h3 className="title">Your Shopping Cart</h3>
      { !cart.line_items.length ? renderEmptyCart() : renderCart() }
    </Container>
  );
};

export default Cart;
