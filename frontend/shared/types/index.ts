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

export enum WorkEnvironment {
  GAS = "gas",
  LIQUID = "liquid",
}

export enum Drive {
  MANUAL = "manual",
  FLYWHEEL = "flywheel",
  GEARBOX = "gearbox",
  PNEUMATIC = "pneumatic",
  ELECTRIC = "electric",
  ELECTROHYDRAULIC = "electrohudraulic",
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
  manufacturingStandart: ManufacturingStandartType;
  diameter: DiameterType;
  classPressure: ClassPressureType;
  temperature: string;
  tightnessClass: TightnessClassType;
  temperatureRange: TemperatureRangeType;
  housingMaterial: MaterialType;
  rodMaterial: MaterialType;
  wedgeMaterial: MaterialType;
  seatMaterial: MaterialType;
  connectionType: ConnectionType;
  constructionLength: string;
  nace: boolean;
  counterFlanges: boolean;
  hairpins: string;
  nuts: string;
  pipeSize: string;
  drive: Drive;
  driveKit: string;
  comment: string;
  counterFlangesMaterial: MaterialType;
  workEnvironment: WorkEnvironment;
  pipeMaterial: MaterialType;
  count: number;
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

export type OptionsType = {
  productTypes: ProductType[];
  constructions: ConstructionType[];
  manufacturingStandart: ManufacturingStandartType[];
  diameters: DiameterType[];
  classPressures: ClassPressureType[];
  tightnessClasses: TightnessClassType[];
  temperatureRanges: TemperatureRangeType[];
  materials: MaterialType[];
  connectionTypes: ConnectionType[];
};
