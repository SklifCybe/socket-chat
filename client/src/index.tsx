import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from './App';

import './index.css';
import { theme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
