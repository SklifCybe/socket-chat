import React, { FC, ReactElement, useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { parse } from 'query-string';
import { Location } from 'history';
import io, { Socket } from 'socket.io-client';
import { AppBar, Container, Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';

let socket: Socket;

type ChatProps = {
  location: Location;
};

type parseLocation = {
  name: string;
  room: string;
};

type message = {
  user: string;
  text: string;
};

export const Chat: FC<ChatProps> = ({ location }): ReactElement => {
  const [name, setName] = useState<string | null | string[]>('');
  const [roomID, setRoomID] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<message>>([]);
  const ENDPOINT = 'http://localhost:5050';

  useEffect(() => {
    const { name, room } = parse(location.search) as parseLocation;

    socket = io(ENDPOINT);

    socket.emit('ROOM:JOIN', { name, room }, () => {
      alert(`This name=${name} is exist`);
      socket.off();
    });

    setName(name);
    setRoomID(room);

    return () => {
      socket.disconnect();
    };
  }, [location.search, ENDPOINT]);

  useEffect(() => {
    socket.on('ROOM:MESSAGE', (message: message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  const handlerMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      socket.emit('ROOM:SEND_MESSAGE', message, () => setMessage(''));
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '0 !important',
        borderRadius: '10px !important',
      }}>
      <AppBar
        position="static"
        sx={{
          width: '100%',
          borderTopLeftRadius: '10px !important',
          borderTopRightRadius: '10px !important',
        }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Room
          </Typography>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <ClearIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Container>
  );
};
