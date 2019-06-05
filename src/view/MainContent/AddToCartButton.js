import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions';

const AddToCartButton = ({ id, isDisabled, addToCart }) => (
  <button
    onClick={() => addToCart(id)}
    disabled={isDisabled}
    test-id="add_to_cart_button"
  >
    add to cart
  </button>
);

const mapState = (state, ownProps) => ({
  isDisabled: state.cart.find(id => id === ownProps.id),
});

const mapDispatch = ({
  addToCart,
});

export default connect(mapState, mapDispatch)(AddToCartButton);
