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
  equipmentType: EquipmentType;
  items?: Item[];
  createdAt: Date;
  updatedAt: Date;
};

export type Item = {
  id: number;
  tagNumber: string;
  techTaskNumber: string;
  productType: ProductType;
  construction: ConstructionType;
};

export type EquipmentType = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductType = {
  id: number;
  name: string;
  model: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ConstructionType = EquipmentType;

export type ManufacturingStandartType = EquipmentType;

export type DiameterType = EquipmentType;

export type ClassPressureType = EquipmentType;

export type TightnessClassType = EquipmentType;

export type TemperatureRangeType = EquipmentType;

export type MaterialType = EquipmentType;

export type ConnectionType = EquipmentType;
