import React from 'react';
import { Card } from 'react-bootstrap';

const Review = ({ checkoutToken }) => (
  <>
    <h6>Order summary</h6>
    <ul className="list-unstyled">
      {checkoutToken.live.line_items.map((product) => (
        <li key={product.name} className="d-flex justify-content-between py-2">
          <div>
            <h6 className="mb-0">{product.name}</h6>
            <small>Quantity: {product.quantity}</small>
          </div>
          <div>
            <span>{product.line_total.formatted_with_symbol}</span>
          </div>
        </li>
      ))}
      <li className="d-flex justify-content-between py-2">
        <div>Total</div>
        <div>
          <strong>{checkoutToken.live.subtotal.formatted_with_symbol}</strong>
        </div>
      </li>
    </ul>
  </>
);

export default Review;
