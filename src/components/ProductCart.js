import React from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';

const ProductCart = ({ product, onAddToCart }) => {
  return (
    <Card className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <CardBody className="d-flex flex-column">
        <CardTitle tag="h5">{product.title}</CardTitle>
        <div className="mt-auto">
          <h6 className="text-primary">${product.price.toFixed(2)}</h6>
          <Button color="success" onClick={() => onAddToCart(product)}>Sepete Ekle</Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCart;