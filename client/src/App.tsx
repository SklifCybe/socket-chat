import React from 'react';
import { Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import { Chat } from './components/Chat';
import { Join } from './components/Join';

export const App = () => {
  return (
    <>
      <CssBaseline />
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </>
  );
};
