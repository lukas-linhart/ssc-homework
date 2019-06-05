import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import View from './view/View';
import { createStore } from './store';
import { fetchOrders } from './store/actions';

const store = createStore();
store.dispatch(fetchOrders());

ReactDOM.render(<View store={store} />, document.getElementById('root'));
