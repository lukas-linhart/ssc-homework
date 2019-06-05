/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { pages } from '../../store';
import { navigateTo } from '../../store/actions';

const Menu = ({ currentPage, navigateTo, itemCount }) => (
  <nav>
    <ul test-id="menu">
      {pages.map((item) => {
        const itemLabel = (item === 'cart' && itemCount > 0) ? `cart (${itemCount})` : item;
        return (
          <li key={item} test-id={item}>
            {item === currentPage ? (
              <span>{itemLabel}</span>
            ) : (
              <a onClick={() => navigateTo(item)}>
                {itemLabel}
              </a>
            )}
          </li>
        )})}
    </ul>
  </nav>
);

const mapState = (state) => ({
  currentPage: state.view,
  itemCount: state.cart.length,
})

const mapDispatch = ({
  navigateTo,
});


export default connect(mapState, mapDispatch)(Menu);
