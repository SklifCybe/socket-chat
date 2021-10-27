import { FC, ReactElement, KeyboardEvent, ChangeEvent } from 'react';
import { InputBase, Box, Button } from '@mui/material';

type ChatInputProps = {
  message: string;
  sendMessage: {
    sendMessageEnter: (event: KeyboardEvent<HTMLInputElement>) => void;
    sendMessageBtn: () => void;
  };
  handleMessage: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const ChatInput: FC<ChatInputProps> = ({
  message,
  sendMessage,
  handleMessage,
}): ReactElement => {
  const { sendMessageEnter, sendMessageBtn } = sendMessage;

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        width: '100%',
        borderRadius: '0 0 10px 10px',
        border: '1px solid black',
      }}>
      <InputBase
        sx={{ mt: '20x', ml: '20px', flex: 1 }}
        placeholder="Type a message..."
        value={message}
        onChange={handleMessage}
        onKeyPress={sendMessageEnter}
        autoFocus
      />
      <Button
        onClick={sendMessageBtn}
        sx={{
          width: 'calc(100% - 75%)',
          borderLeft: '1px solid black',
          borderRadius: '0',
        }}
        variant="text">
        Send
      </Button>
    </Box>
  );
};
