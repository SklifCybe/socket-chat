import { FC, ReactElement } from 'react';
import { Container, Box } from '@mui/material';

import { Message } from './Message';

import { message } from './Chat';

type MessagesProps = {
  messages: Array<message>;
};

export const Messages: FC<MessagesProps> = ({ messages }): ReactElement => {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '20rem',
        width: '100%',
        border: 'solid #888',
        borderWidth: '0 1px 0 1px',
        padding: '1rem',
      }}>
      {messages.map((message) => (
        <Message message={message} />
      ))}
    </Box>
  );
};
