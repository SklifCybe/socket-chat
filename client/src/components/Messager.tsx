import { FC, ReactElement, MutableRefObject } from 'react';
import { Box } from '@mui/material';

import { Message } from './Message';

import { message } from './Chat';

type MessagerProps = {
  messages: Array<message>;
  name: string;
  messageRef: MutableRefObject<null | HTMLInputElement>;
};

export const Messager: FC<MessagerProps> = ({ messages, name, messageRef }): ReactElement => {
  return (
    <Box
      component="div"
      ref={messageRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '20rem',
        width: '100%',
        border: 'solid #888',
        borderWidth: '0 1px 0 1px',
        padding: '1rem',
        overflowY: 'auto',
      }}>
      {messages.map((message, index: number) => (
        <Message key={index} message={message} name={name} />
      ))}
    </Box>
  );
};
