import { createStore as createReduxStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  ADD_TO_CART,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  NAVIGATE_TO,
  QUERY_ORDER,
  REMOVE_FROM_CART,
  SUBMIT_ORDER_REQUEST,
  SUBMIT_ORDER_SUCCESS,
} from './actionTypes';

export const pages = [
  'products',
  'cart',
  'order details',
];

export const products = {
  A: {
    name: 'Tesla Model S',
    price: 106750,
  },
  B: {
    name: 'Tesla Model X',
    price: 112950,
  },
  C: {
    name: 'Tesla Model 3',
    price: 51850,
  },
  D: {
    name: 'Tesla Roadster',
    price: 250000,
  },
};

export const priceById = (id) => products[id].price;

const defaultView = pages[0];

const initialState = {
  view: defaultView,
  cart: [],
  orders: {},
  isSubmittingOrder: false,
  isDeletingOrder: false,
  viewedOrder: undefined,
  notification: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [ ...state.cart, action.productId ],
      };

    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        isDeletingOrder: true,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        isDeletingOrder: false,
        notification: `Order deletion successful. Order id: ${action.orderId}`,
        viewedOrder: undefined,
      };

    case FETCH_ORDERS_REQUEST:
      return { ...state, orders: {} };

    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
      };

    case NAVIGATE_TO:
      return {
        ...state,
        view: action.page,
        notification: null,
        viewedOrder: undefined,
      };

    case QUERY_ORDER:
      return {
        ...state,
        viewedOrder: Object.keys(state.orders).find(
          id => String(id) === String(action.orderId)
        ) || null,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(id => id !== action.productId),
      };

    case SUBMIT_ORDER_REQUEST:
      return { ...state, isSubmittingOrder: true };

    case SUBMIT_ORDER_SUCCESS:
      return {
        ...state,
        view: defaultView,
        cart: [],
        isSubmittingOrder: false,
        notification: `Purchase successful. Order id: ${action.orderId}`,
      };

    default:
      return state;
  }
}

export const createStore = () => {
  return createReduxStore(
    reducer,
    initialState,
    applyMiddleware(thunk),
  );
}
