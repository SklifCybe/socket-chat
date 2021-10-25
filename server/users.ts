export type user = {
  id: string;
  name: string;
  room: string;
};

let users: Array<user> = [];

type addUserReturn = {
  user?: user | null;
  error?: string | null;
};

export const addUser = (userData: user, id: string): addUserReturn => {
  const name: string = userData.name.trim();
  const room: string = userData.room.trim();

  const isMatch: boolean = !!users.find((user) => user.name === name && user.room === room);

  if (isMatch) {
    return { error: 'Username is exist.', user: null };
  }

  const user = {
    id,
    name: userData.name,
    room: userData.room,
  };

  users.push(user);
  return { user, error: null };
};

export const removeUser = (id: string): void => {
  users = users.filter((user) => user.id !== id);
};

export const getUser = (id: string): user | void => users.find((user) => user.id === id);

export const getUsersInRoom = (room: string): Array<user> => {
  return users.filter((user) => user.room === room);
};
