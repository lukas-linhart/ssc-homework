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
import axios from '../api';

export const addToCart = (productId) => ({
  type: ADD_TO_CART,
  productId,
});

const deleteOrderRequest = (orderId) => ({
  type: DELETE_ORDER_REQUEST,
  orderId,
});

const deleteOrderSuccess = (orderId) => ({
  type: DELETE_ORDER_SUCCESS,
  orderId,
});

export const deleteOrder = (orderId) => (dispatch) => {
  dispatch(deleteOrderRequest(orderId));
  axios.delete(`/order/${orderId}`)
    .then((res) => {
      dispatch(deleteOrderSuccess(orderId));
      dispatch(fetchOrders());
    })
}

const fetchOrdersRequest = () => ({
  type: FETCH_ORDERS_REQUEST,
});

const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrders = () => (dispatch) => {
  dispatch(fetchOrdersRequest());
  axios.get('/orders')
    .then((res) => {
      const ordersById = res.data.reduce((acc, order) => ({
        ...acc,
        [order.orderId]: order.items,
      }), {});
      dispatch(fetchOrdersSuccess(ordersById));
    })
    .catch((err) => console.log(err))
}

export const navigateTo = (page) => ({
  type: NAVIGATE_TO,
  page,
});

export const queryOrder = (orderId) => ({
  type: QUERY_ORDER,
  orderId,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  productId,
});

const submitOrderRequest = (productIds) => ({
  type: SUBMIT_ORDER_REQUEST,
  productIds,
});

const submitOrderSuccess = (orderId) => ({
  type: SUBMIT_ORDER_SUCCESS,
  orderId,
});

export const submitOrder = (productIds) => (dispatch) => {
  dispatch(submitOrderRequest());
  axios.post('/orders', { items: productIds })
    .then((res) => {
      dispatch(submitOrderSuccess(res.data.orderId));
      dispatch(fetchOrders());
    })
    .catch((err) => console.log(err))
};
