export type Guest = {
  _id: string;
  firstName: string;
  phone: string;
  lastName: string;
  email: string;
  passportNumber: string;
  city: string;
  address: string;
  notice: string;
};

export type GuestBody = {
  firstName: string;
  phone: string;
  lastName: string;
  email: string;
  passportNumber: string;
  city: string;
  address: string;
  notice: string;
};

export type GuestResponse = {
  success: boolean;
  message: string;
  guest: Guest;
};
export type GuestsResponse = {
  success: boolean;
  message: string;
  data: Guest[] | [];
};
