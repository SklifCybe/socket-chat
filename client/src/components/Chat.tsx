import React, { FC, ReactElement, useState, useEffect } from 'react';
import { parse } from 'query-string';
import { Location } from 'history';
import io, { Socket } from 'socket.io-client';

let socket: Socket;

type ChatProps = {
  location: Location;
};

type parseLocation = {
  name: string;
  room: string;
};

export const Chat: FC<ChatProps> = ({ location }): ReactElement => {
  const [name, setName] = useState<string | null | string[]>('');
  const [roomID, setRoomID] = useState('');
  const ENDPOINT = 'http://localhost:5050';

  useEffect(() => {
    const { name, room } = parse(location.search) as parseLocation;

    socket = io(ENDPOINT);

    socket.emit('ROOM:JOIN', { name, room });

    setName(name);
    setRoomID(room);

    return () => {
      socket.disconnect();
    };
  }, [location.search, ENDPOINT]);

  return <div>Chat page</div>;
};
