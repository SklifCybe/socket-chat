import { FC, ReactElement, SetStateAction } from 'react';
import { Switch, Typography, Container, IconButton } from '@mui/material';
import { Brightness3 as MoonIcon, Brightness7 as SunIcon } from '@mui/icons-material';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

type ToggleThemeProps = {
  theme: boolean;
  setTheme: (theme: SetStateAction<boolean>) => void;
};

export const ToggleTheme: FC<ToggleThemeProps> = ({ theme, setTheme }): ReactElement => {
  const changeTheme = () => {
    setTheme((prev) => !prev);
  };

  return (
    <Container sx={{ textAlign: 'right', padding: '0', margin: '0' }}>
      <Typography component="h2" variant="h5">
        Toggle theme
      </Typography>
      <IconButton onClick={changeTheme}>{theme ? <MoonIcon /> : <SunIcon />}</IconButton>
      {/* <Switch {...label} sx={{ marginRight: '25px' }} checked={theme} onChange={handleTheme} /> */}
    </Container>
  );
};
