export type user = {
  id: string;
  name: string;
  room: string;
};

let users: Array<user> = [];

type addUserReturn = {
  user?: user | null;
  error?: string | null;
}

export const addUser = (user: user): addUserReturn => {
  const name: string = user.name.trim();
  const room: string = user.room.trim();

  const isMatch: boolean = !!users.find((user) => user.name === name && user.room === room);

  if (isMatch) {
    return { error: 'Username is exist.', user: null };
  }

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