import React from 'react';
import './View.css';
import { Provider } from 'react-redux';
import Menu from './Menu/';
import MainContent from './MainContent/';

const View = ({ store }) => (
  <Provider store={store}>
    <div className="View">
      <div className="View-menu">
        <Menu />
      </div>
      <div className="View-main">
        <MainContent />
      </div>
    </div>
  </Provider>
);

export default View;
