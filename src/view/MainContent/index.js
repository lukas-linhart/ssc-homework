import React from 'react';
import { connect } from 'react-redux';
import Products from './Products';
import Cart from './Cart';
import OrderDetails from './OrderDetails';

const MainContent = ({ page, notification }) => (
  <React.Fragment>
    {notification && <div test-id="notification">{notification}</div>}
    {
      (
        page === 'cart' && <Cart />
      ) || (
        page === 'order details' && <OrderDetails />
      ) || <Products />
    }
  </React.Fragment>
);

const mapState = (state) => ({
  page: state.view,
  notification: state.notification,
})

export default connect(mapState)(MainContent);
