import React from 'react';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout }) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      console.log('[error]', error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
        shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <hr />
      <h6 style={{ margin: '20px 0' }}>Payment method</h6>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>{({ elements, stripe }) => (
          <Form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
            <Form.Group>
              <CardElement />
            </Form.Group>
            <Button variant="outline-secondary" onClick={backStep}>Back</Button>
            {' '}
            <Button type="submit" variant="primary" disabled={!stripe}>
              Pay {checkoutToken.live.subtotal.formatted_with_symbol}
            </Button>
          </Form>
        )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
