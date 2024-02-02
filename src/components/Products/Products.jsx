import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from './Product/Product';
import useStyles from './styles';

const Products = ({ products, onAddToCart }) => {
  const classes = useStyles();

  if (!products.length) return <p>Loading...</p>;

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Row className="justify-content-center" xs={1} sm={2} md={3} lg={4} xl={4} xxl={5} gap={4}>
        {products.map((product) => (
          <Col key={product.id}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Col>
        ))}
      </Row>
    </main>
  );
};

export default Products;
