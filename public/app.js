import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './js/landing';
import { BrowserRouter } from 'react-router-dom';
import LandingRouter from './js/LandingRouter';

ReactDOM.render(
  <LandingRouter />,
  document.querySelector('.markup')
)