import React from 'react';
import ProductRow from './ProductRow';
import AddToCartButton from './AddToCartButton';
import RemoveFromCartButton from './RemoveFromCartButton';
import { priceById } from '../../store';
import { showPrice } from '../helpers';

const ProductTable = ({ tableType, itemIds }) => {
  const total = itemIds
    .map(priceById)
    .reduce((x, y) => x + y, 0);

  const Button =
    (tableType === 'products' && AddToCartButton)
    || (tableType === 'cart' && RemoveFromCartButton)
    || null;

  return (
    <table test-id="products_table">
      <thead>
        <tr>
          <th scope="col">product name</th>
          <th scope="col">price</th>
        </tr>
      </thead>
      <tbody>
        {itemIds.map(id => <ProductRow id={id} key={id} ButtonSlot={Button} />)}
      </tbody>
      {tableType !== "products" && (
        <tfoot>
          <tr>
            <th scope="row">total</th>
            <td>
              {showPrice(total)}
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}

export default ProductTable;
