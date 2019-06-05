import React from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from '../../store/actions';

const RemoveFromCartButton = ({ id, removeFromCart }) => (
  <button
    onClick={() => removeFromCart(id)}
    test-id="remove_from_cart_button"
  >
    remove from cart
  </button>
);

const mapDispatch = ({
  removeFromCart,
});

export default connect(null, mapDispatch)(RemoveFromCartButton);
