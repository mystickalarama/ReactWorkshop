import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

const CategoryList = ({ categories, onSelectedCategory }) => {
  return (
    <div className="d-flex flex-column">
      {categories.map((category) => (
        <Card 
          key={category.id}
          className="mb-2 category-card"
          onClick={() => onSelectedCategory(category)}
          style={{
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
          }}
        >
          <CardBody>
            <CardTitle className="text-center">{category.name}</CardTitle>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default CategoryList;