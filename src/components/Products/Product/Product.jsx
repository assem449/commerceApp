import React from 'react';
import { Card, Button } from 'react-bootstrap';

import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
 

  const handleAddToCart = () => onAddToCart(product.id, 1);

  return (
    <Card className={classes.root}>
      <Card.Img variant="top" src={product.media.source} alt={product.name} className={classes.media} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price.formatted}</Card.Text>
        <Card.Text dangerouslySetInnerHTML={{ __html: product.description }} />
        <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
