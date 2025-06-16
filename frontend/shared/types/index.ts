export type TJwtPayload = {
  sub: number;
  username: string;
  endContract?: Date | null;
  iat: number;
  exp: number;
};

export type User = {
  id: number;
  username: string;
  about: string;
  adressOneLine: string;
  adressTwoLine: string;
  phone: string;
  avatar: string;
  email: string;
  password?: string;
  role: UserRole;
  endContract?: Date | null;
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
  MIXTURE = "mixture",
}
export enum Drive {
  MANUAL = "manual",
  FLYWHEEL = "flywheel",
  GEARBOX = "gearbox",
  PNEUMATIC = "pneumatic",
  HYDRAULIC = "hydraulic",
  ELECTRIC = "electric",
  ELECTROHYDRAULIC = "electrohudraulic",
  CHAIN_DRIVE = "chain_drive",
}

export enum TypeZra {
  BOLT_ON_LID = "BOLT_ON_LID",
  WEDGE_GATE_PARALLEL_SLIDING = "WEDGE_GATE_PARALLEL_SLIDING",
  BELLOWS = "BELLOWS",
  PRESSURE_SEAL_GATE = "PRESSURE_SEAL_GATE",
  HIGH_PRESSURE_PARALLEL_SLIDING = "HIGH_PRESSURE_PARALLEL_SLIDING",
  SPHERICAL_PIPELINE_GATE = "SPHERICAL_PIPELINE_GATE",
  BOLTED_COVER = "BOLTED_COVER",
  TYPE_Y = "TYPE_Y",
  ANGULAR = "ANGULAR",
  BELLOWS_VALVE = "BELLOWS_VALVE",
  BELLOWS_TYPE_Y = "BELLOWS_TYPE_Y",
  PRESSURE_SEAL_GLOBE = "PRESSURE_SEAL_GLOBE",
  PRESSURE_SEAL_GLOBE_TYPE_Y = "PRESSURE_SEAL_GLOBE_TYPE_Y",
  TURNING = "TURNING",
  PISTON = "PISTON",
  PISTON_TYPE_Y = "PISTON_TYPE_Y",
  SWING_CHECK_PRESSURE_SEAL = "SWING_CHECK_PRESSURE_SEAL",
  LIFT_CHECK_PRESSURE_SEAL_STRAIGHT = "LIFT_CHECK_PRESSURE_SEAL_STRAIGHT",
  LIFT_CHECK_PRESSURE_SEAL_Y_PATTERN = "LIFT_CHECK_PRESSURE_SEAL_Y_PATTERN",
  INCLINED_DISK = "INCLINED_DISK",
  FLOATING_PLUG_SIDE_ENTRY = "FLOATING_PLUG_SIDE_ENTRY",
  TRUNNION_BALL_SIDE_ENTRY = "TRUNNION_BALL_SIDE_ENTRY",
  TRUNNION_BALL_TOP_ENTRY = "TRUNNION_BALL_TOP_ENTRY",
  MONOBLOCK = "MONOBLOCK",
  FLOATING_TWIN = "FLOATING_TWIN",
  THREE_WAY = "THREE_WAY",
  TWO_CENTERED = "TWO_CENTERED",
  THREE_CENTERED = "THREE_CENTERED",
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
  documentationSheet: boolean;
  installationDrawings: boolean;
  assemblyDrawing: boolean;
  agreementProtocol: boolean;
  installationInstructions: boolean;
  qualityPlan: boolean;
  materialsCertificate: boolean;
  declarationOfTRTC: boolean;
  presenceOfCustomerDuringTesting: boolean;
  gasInspectionHighPressure: boolean;
  thirdSideInspection: boolean;
  filePath: string;
  filePathPdf: string;
};

export type Item = {
  id: number;
  tagNumber: string;
  techTaskNumber: string;
  productType: ProductType;
  typeZra: TypeZra;
  typeOfOrgan: string;
  construction: ConstructionType;
  manufacturingStandart: ManufacturingStandartType;
  diameter: string;
  classPressure: string;
  temperature: string;
  tightnessClass: TightnessClassType;
  temperatureRange: TemperatureRangeType;
  housingMaterial: string;
  rodMaterial: string;
  wedgeMaterial: string;
  seatMaterial: string;
  connectionType: string;
  constructionLength: string;
  nace: boolean;
  counterFlanges: boolean;
  hairpins: string;
  nuts: string;
  pipeSize: string;
  drive: Drive;
  driveKit: string;
  comment: string;
  counterFlangesMaterial: string;
  workEnvironment: WorkEnvironment;
  pipeMaterial: string;
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

export type TightnessClassType = EquipmentType;

export type TemperatureRangeType = EquipmentType;

export type MaterialType = EquipmentType;

export type OptionsType = {
  productTypes: ProductType[];
  constructions: ConstructionType[];
  manufacturingStandart: ManufacturingStandartType[];
  tightnessClasses: TightnessClassType[];
  temperatureRanges: TemperatureRangeType[];
};

export type FilesModel = {
  originalname: string;
  filename: string;
  path: string;
};

export type MaterialEntry = {
  rod: string; // шток
  wedge: string; // клин
  seat: string; // седло
};

export type FlangeMaterialEntry = {
  studs: string; // Шпильки
  nuts: string; // Гайки
};

type Size = string; // Например: '1/2"', '3/4"'
type Length = number;

export type ConnectionType = {
  [key in Size]: Length;
};

type PressureClass = {
  [key: string]: ConnectionType; // Например: "RF|B", "BW", "RF|B|BW", "RTJ|J"
};

export type LengthTable = {
  [key: string]: PressureClass; // Например: "150#", "300#", "600#"
};
