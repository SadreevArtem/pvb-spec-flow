export type TJwtPayload = {
  sub: number;
  username: string;
  iat: number;
  exp: number;
};

export type User = {
  id: number;
  username: string;
  about: string;
  avatar: string;
  email: string;
  password?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};

export enum UserRole {
  ADMIN = "admin",
  TENDER_MANAGER = "tender_manager",
}

export type Customer = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Order = {
  id: number;
  contractNumber: string;
  complectName: string;
  count: number;
  customer: Customer;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
};
