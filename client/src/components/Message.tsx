import { Container } from '@mui/material';
import { FC, ReactElement } from 'react';

import { message } from './Chat';

type MessageProps = {
  message: message;
};

export const Message: FC<MessageProps> = ({ message }): ReactElement => {
  return (
    <Container sx={{ padding: '0 !important' }}>
      {message.user}: {message.text}
    </Container>
  );
};
