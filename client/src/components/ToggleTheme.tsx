import { FC, ReactElement, SetStateAction } from 'react';
import { Container, IconButton } from '@mui/material';
import { Brightness3 as MoonIcon, Brightness7 as SunIcon } from '@mui/icons-material';

type ToggleThemeProps = {
  theme: boolean;
  setTheme: (theme: SetStateAction<boolean>) => void;
};

export const ToggleTheme: FC<ToggleThemeProps> = ({ theme, setTheme }): ReactElement => {
  const changeTheme = () => {
    setTheme((prev) => !prev);
  };

  return (
    <Container sx={{ textAlign: 'right', paddingTop: '10px' }}>
      <IconButton onClick={changeTheme}>{theme ? <MoonIcon /> : <SunIcon />}</IconButton>
    </Container>
  );
};
