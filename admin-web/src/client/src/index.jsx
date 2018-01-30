import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Layout from './components/layout';

ReactDOM.render((
  <Provider store={{}}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>
),
  document.getElementById('root') // eslint-disable-line
);
