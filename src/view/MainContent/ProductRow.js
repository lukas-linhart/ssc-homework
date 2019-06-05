import React from 'react';
import { products } from '../../store';

const ProductRow = ({ id, ButtonSlot }) => (
  <tr>
    <td>
      {products[id].name}
    </td>
    <td>
      {`${products[id].price} USD`}
    </td>
    <td>
      {ButtonSlot && <ButtonSlot id={id} />}
    </td>
  </tr>
);

export default ProductRow;
