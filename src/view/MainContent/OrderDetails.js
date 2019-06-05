import React from 'react';
import ProductTable from './ProductTable';
import { connect } from 'react-redux';
import { deleteOrder, queryOrder } from '../../store/actions';

const ORDER_ID_INPUT = 'orderIdInput';

const OrderDetails = ({
  orderId,
  itemIds,
  isDeletingOrder,
  deleteOrder,
  queryOrder,
}) => (
  <main test-id="order_details">
    <h1 test-id="title">Order details</h1>

    <div test-id="order_query_form" onSubmit={null}>
      Order id:
      <input type="text" id={ORDER_ID_INPUT} />
      <button
        onClick={(e) => {
          const id = document.getElementById(ORDER_ID_INPUT).value;
          queryOrder(id);
        }}
      >
        show order
      </button>
    </div>

    {(
      orderId === undefined && <div test-id="no_order_selected">no order selected</div>
    ) || (
      orderId === null && <div test-id="no_such_order">no such order</div>
    ) || (
      <React.Fragment>
        <ProductTable itemIds={itemIds} />
        <button
          disabled={isDeletingOrder}
          onClick={() => {
            deleteOrder(orderId);
          }}
          test-id="delete_order_button"
        >
          delete the order
        </button>
      </React.Fragment>
    )}
  </main>
);

const mapState = (state) => {
  const orderId = state.viewedOrder;
  return {
    orderId,
    itemIds: (orderId && state.orders[orderId]) || [],
    isDeletingOrder: state.isDeletingOrder,
  };
}

const mapDispatch = ({
  queryOrder,
  deleteOrder,
});

export default connect(mapState, mapDispatch)(OrderDetails);
