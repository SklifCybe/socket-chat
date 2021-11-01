import { FC, ReactElement, useState, useEffect, ChangeEvent, KeyboardEvent, useRef } from 'react';
import { parse } from 'query-string';
import { Location } from 'history';
import io, { Socket } from 'socket.io-client';
import { Container } from '@mui/material';
import { useHistory } from 'react-router-dom';

import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { Messager } from './Messager';

let socket: Socket;

type ChatProps = {
  location: Location;
};

type parseLocation = {
  name: string;
  room: string;
};

export type message = {
  user: string;
  text: string;
};

export const Chat: FC<ChatProps> = ({ location }): ReactElement => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [roomID, setRoomID] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<message>>([]);
  const messageRef = useRef<HTMLInputElement>(null);
  const ENDPOINT = process.env.REACT_APP_BACKEND_URI_DEV || 'http://localhost:5050';

  useEffect(() => {
    const { name, room } = parse(location.search) as parseLocation;

    socket = io(ENDPOINT);

    socket.emit('ROOM:JOIN', { name, room }, () => {
      alert(`This name=${name} is exist`);
      history.push('/');
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

  useEffect(() => {
    if (messageRef) {
      messageRef?.current?.scrollTo(0, 99999);
    }
  }, [messages]);

  const handleMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sendMessageEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && message) {
      socket.emit('ROOM:SEND_MESSAGE', message, () => setMessage(''));
    }
  };

  const sendMessageBtn = () => {
    if (message) {
      socket.emit('ROOM:SEND_MESSAGE', message, () => setMessage(''));
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '0 !important',
        borderRadius: '10px !important',
      }}>
      <ChatHeader history={history} roomName={roomID} />
      <Messager messages={messages} name={name} messageRef={messageRef} />
      <ChatInput
        message={message}
        sendMessage={{ sendMessageEnter, sendMessageBtn }}
        handleMessage={handleMessage}
      />
    </Container>
  );
};
