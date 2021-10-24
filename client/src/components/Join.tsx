import React, { ChangeEvent, FC, ReactElement, useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

export const Join: FC = (): ReactElement => {
  const [name, setName] = useState('');
  const [roomID, setRoomID] = useState('');
  const history = useHistory();

  const handlename = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value);
  };

  const handleRoomID = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setRoomID(event.target.value);
  };

  const handleSubmit = () => {
    if (name && roomID) {
      history.push(`/chat?name=${name}&room=${roomID}`);
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
      }}>
      <Typography component="h1" variant="h5">
        Join in Chat
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        label="User Name"
        inputProps={{ style: { color: 'white' } }}
        value={name}
        onChange={handlename}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Room ID"
        inputProps={{ style: { color: 'white' } }}
        value={roomID}
        onChange={handleRoomID}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleSubmit}>
        JOIN
      </Button>
    </Container>
  );
};
