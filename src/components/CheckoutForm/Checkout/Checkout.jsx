import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import './styles.css'; // Import your custom CSS styles

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, onCaptureCheckout, order, error }) => {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const history = useHistory();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });

          setCheckoutToken(token);
        } catch {
          if (activeStep !== steps.length) history.push('/');
        }
      };

      generateToken();
    }
  }, [cart]);

  const test = (data) => {
    setShippingData(data);

    nextStep();
  };

  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <h5>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</h5>
        <hr />
        <p>Order ref: {order.customer_reference}</p>
      </div>
      <br />
      <Button as={Link} variant="outline-primary" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className="spinner">
      <ProgressBar animated now={100} />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <h5>Error: {error}</h5>
        <br />
        <Button as={Link} variant="outline-primary" type="button" to="/">Back to home</Button>
      </>
    );
  }

  const Form = () => (activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} nextStep={nextStep} setShippingData={setShippingData} test={test} />
    : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />);

  return (
    <>
      <div className="toolbar" />
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="checkout">
              <h4>Checkout</h4>
              <ul className="progress">
                {steps.map((label, index) => (
                  <li key={label} className={index === activeStep ? 'active' : ''}>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
              {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Checkout;
