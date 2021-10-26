import { FC, ReactElement } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { History } from 'history';
import ClearIcon from '@mui/icons-material/Clear';

type ChatHeaderProps = {
  history: History;
  roomName: string;
};

export const ChatHeader: FC<ChatHeaderProps> = ({ history, roomName }): ReactElement => {
  const onExitChat = () => {
    history.push('/');
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: '100%',
        borderTopLeftRadius: '10px !important',
        borderTopRightRadius: '10px !important',
      }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {roomName}
        </Typography>
        <IconButton
          onClick={onExitChat}
          sx={{ mr: '10px' }}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu">
          <ClearIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
