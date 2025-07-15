import {
  FlangeMaterialEntry,
  MaterialEntry,
} from "../../../../../../../../shared/types";

export const staticOptions = {
  manufacturingStandart: [
    { id: 1, name: "DIN 3357" },
    { id: 2, name: "BS 5351" },
    { id: 3, name: "ASME B16.34" },
    { id: 4, name: "API 6D" },
  ],
  typeOfOrgan: [{ id: 1, name: "ШАР" }],
  diameters: [
    { id: 1, name: "1/2" },
    { id: 2, name: "3/4" },
    { id: 3, name: '1"1/4' },
    { id: 4, name: '1"1/2' },
    { id: 5, name: '2"' },
  ],
  classPressures: [
    { id: 1, name: "900#" },
    { id: 2, name: "1500#" },
    { id: 3, name: "2500#" },
  ],
  temperature: [
    { id: 1, name: "Стандартная (-46°C <= T <= +200°C)" },
    { id: 2, name: "Низкотемпературная (-60°C <= T <= +200°C)" },
    { id: 3, name: "Высокотемпературная (-46°C <= T <= +400°C)" },
    { id: 4, name: "Абразивная (-46°C <= T <= +200°C)" },
    { id: 5, name: "Низкотемпературная абразивная (-60°C <= T <= +200°C)" },
    { id: 6, name: "Высокотемпературная (T > +400°C)" },
    { id: 7, name: "Криогенная (-196°C <= T <= 50°C)" },
  ],
  materials: [
    { id: 1, name: "ASTM A105" },
    { id: 2, name: "A182 F304" },
    { id: 3, name: "A182 F316" },
    { id: 4, name: "A350 LF2" },
    { id: 5, name: "904L" },
    { id: 6, name: "F51" },
    { id: 7, name: "F55" },
    { id: 8, name: "09Г2С" },
    { id: 9, name: "08Х18Н10" },
    { id: 10, name: "20" },
  ],
  connectionTypes: [
    { id: 2, name: "w/Nipple" },
    { id: 3, name: "NPT ASME B1.20.1" },
    { id: 4, name: "ГОСТ 9400-81" },
  ],
  materialsFlanges: [
    { id: 1, name: "-" },
    { id: 2, name: "A 105 N" },
    { id: 3, name: "A 216 Gr. WCB" },
    { id: 4, name: "A 350 Gr. LF2" },
    { id: 5, name: "A 350 Gr. LF3" },
    { id: 6, name: "A 182 Gr. F304" },
    { id: 7, name: "A 182 Gr. F316" },
    { id: 8, name: "A 182 Gr. F316L" },
    { id: 9, name: "A 182 Gr. F321" },
    { id: 10, name: "09Г2С" },
    { id: 11, name: "13ХФА" },
    { id: 12, name: "20" },
    { id: 13, name: "20Л" },
    { id: 14, name: "20ГЛ" },
  ],
  driveKit: [
    { id: 1, name: "нет" },
    { id: 2, name: "Кабельные вводы" },
    { id: 3, name: "Электрообогрев" },
  ],
};

export const materialMap: Record<string, MaterialEntry> = {
  "ASTM A105": {
    rod: "A182 F6a",
    wedge: "ASTM A105+ENP",
    seat: "ASTM A105+ENP",
  },
  "A182 F304": { rod: "A182 F304", wedge: "A182 F304", seat: "A182 F304" },
  "A182 F316": { rod: "A182 F316", wedge: "A182 F316", seat: "A182 F316" },
  "A350 LF2": { rod: "A182 F304", wedge: "A182 F304", seat: "A182 F304" },
  "904L": { rod: "904L", wedge: "904L", seat: "904L" },
  F51: { rod: "F51", wedge: "F51", seat: "F51" },
  F55: { rod: "F55", wedge: "F55", seat: "F55" },
  "09Г2С": { rod: "20Х13", wedge: "08Х18Н10", seat: "08Х18Н10" },
  "08Х18Н10": { rod: "08Х18Н10", wedge: "08Х18Н10", seat: "08Х18Н10" },
  "20": { rod: "20Х13", wedge: "30Х13+ТО", seat: "30Х13+ТО" },
};

export const flangesMap: Record<string, FlangeMaterialEntry> = {
  "A 105 N": { studs: "B7", nuts: "2H" },
  "A 216 Gr. WCB": { studs: "B7", nuts: "2H" },
  "A 350 Gr. LF2": { studs: "B7", nuts: "2H" },
  "A 350 Gr. LF3": { studs: "B7", nuts: "2H" },
  "A 182 Gr. F304": { studs: "B8", nuts: "G8" },
  "A 182 Gr. F316": { studs: "B8", nuts: "G8" },
  "A 182 Gr. F316L": { studs: "B8", nuts: "G8" },
  "A 182 Gr. F321": { studs: "B8", nuts: "G8" },
  "09Г2С": { studs: "35ХМ", nuts: "35" },
  "13ХФА": { studs: "35ХМ", nuts: "35" },
  "20": { studs: "35ХМ", nuts: "35" },
  "20Л": { studs: "35ХМ", nuts: "35" },
  "20ГЛ": { studs: "35ХМ", nuts: "35" },
  "-": { studs: "-", nuts: "-" },
};

export const lengthTable = {
  "900#": {
    "BW|NPT": {
      "1/2": 85,
      "3/4": 90,
      '1"': 110,
      '1"1/4': 125,
      '1"1/2': 130,
      '2"': 155,
    },
    "w/Nipple": {
      "1/2": 285,
      "3/4": 290,
      '1"': 310,
      '1"1/4': 325,
      '1"1/2': 330,
      '2"': 355,
    },
  },
  "1500#": {
    "BW|NPT": {
      "1/2": 85,
      "3/4": 90,
      '1"': 110,
      '1"1/4': 125,
      '1"1/2': 130,
      '2"': 155,
    },
    "w/Nipple": {
      "1/2": 285,
      "3/4": 290,
      '1"': 310,
      '1"1/4': 325,
      '1"1/2': 330,
      '2"': 355,
    },
  },
  "2500#": {
    "BW|NPT": {
      "1/2": 85,
      "3/4": 90,
      '1"': 110,
      '1"1/4': 125,
      '1"1/2': 130,
      '2"': 155,
    },
    "w/Nipple": {
      "1/2": 285,
      "3/4": 290,
      '1"': 310,
      '1"1/4': 325,
      '1"1/2': 330,
      '2"': 355,
    },
  },
};
