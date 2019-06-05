import React from 'react';
import ProductTable from './ProductTable';
import { products } from '../../store';

const Products = () => (
  <main test-id="products">
    <h1 test-id="title">Products</h1>
    <ProductTable itemIds={Object.keys(products)} tableType="products" />
  </main>
);

export default Products;
