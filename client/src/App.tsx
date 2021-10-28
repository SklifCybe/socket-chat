import { FC, ReactElement, useState } from 'react';
import { Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { Chat } from './components/Chat';
import { Join } from './components/Join';
import { ToggleTheme } from './components/ToggleTheme';

import { lightTheme, darkTheme } from './themes';

export const App: FC = (): ReactElement => {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <CssBaseline />
      <ToggleTheme theme={theme} setTheme={setTheme} />
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </ThemeProvider>
  );
};
