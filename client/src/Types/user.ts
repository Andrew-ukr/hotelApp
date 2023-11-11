export type User = { id: string; name: string; email: string };

export type UserResponse = {
  success: boolean;
  message: string;
  user: User;
};

export type UserCredentials = {
  name: string;
  email: string;
  password: string;
};