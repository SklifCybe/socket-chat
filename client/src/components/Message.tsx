import { Grid, Typography, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FC, ReactElement } from 'react';

import { message } from './Chat';

type MessageProps = {
  message: message;
  name: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  message: {
    display: 'flex',
    alignItems: 'center',
    color: '#000',
  },
  messageText: {
    wordBreak: 'break-word',
    margin: '5px 10px',
    padding: '6px',
    borderRadius: '10px',
  },
  myMessageColor: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
  },
  notMyMessageColor: {
    backgroundColor: theme.palette.secondary.light,
    color: '#000',
  },
  notMyMessage: {
    justifyContent: 'right',
  },
}));

export const Message: FC<MessageProps> = ({ message, name }): ReactElement => {
  const classes = useStyles();
  let isMyMessage = false;

  if (message.user === name) {
    isMyMessage = true;
  }

  return (
    <>
      {isMyMessage ? (
        <Grid container spacing={1}>
          <Grid item className={classes.message}>
            <Typography>{message.user}:</Typography>
            <Typography className={`${classes.messageText} ${classes.myMessageColor}`}>
              {message.text}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1} className={classes.notMyMessage}>
          <Grid item className={classes.message}>
            <Typography>{message.user}:</Typography>
            <Typography className={`${classes.messageText} ${classes.notMyMessageColor}`}>
              {message.text}
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};
