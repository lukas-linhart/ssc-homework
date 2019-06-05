import React from 'react';
import ProductTable from './ProductTable';
import { connect } from 'react-redux';
import { submitOrder } from '../../store/actions';

const Cart = ({ itemIds, isSubmittingOrder, submitOrder }) => (
  <main test-id="cart">
    <h1 test-id="title">Cart</h1>
    {(
      itemIds.length < 1 && <div>the cart is empty</div>
    ) || (
      <React.Fragment>
        <ProductTable itemIds={itemIds} tableType="cart" />
        <button
          disabled={isSubmittingOrder}
          onClick={() => {
            submitOrder(itemIds);
          }}
          test-id="submit_order_button"
        >
          submit order
        </button>
      </React.Fragment>
    )}
  </main>
);

const mapState = (state) => ({
  itemIds: state.cart,
  isSubmittingOrder: state.isSubmittingOrder,
});

const mapDispatch = ({
  submitOrder,
});

export default connect(mapState, mapDispatch)(Cart);
