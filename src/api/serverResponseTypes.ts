import { UserType } from '../types/types';

export type SendConfirmationEmailServerType = {
  message: string;
};

export type UserLoginServerType = {
  user: UserType;
  token: string;
};

export type CreateManufacturerType = {
  id: number;
  userId: number;
  title: string;
  inn: string;
  phone: string;
  addressId: number;
  approved: boolean;
};

export type DeletePictureType = {
  fileName: string;
  result: number;
};
