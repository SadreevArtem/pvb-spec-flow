import {
  FlangeMaterialEntry,
  MaterialEntry,
} from "../../../../../../../../shared/types";

export const staticOptions = {
  manufacturingStandart: [
    { id: 1, name: "API 600" },
    {
      id: 2,
      name: "BS 1414",
    },
    {
      id: 3,
      name: "ASME B16.34",
    },
    {
      id: 4,
      name: "ISO 10434",
    },
    {
      id: 5,
      name: "API 602",
    },
  ],
  typeOfOrgan: [
    { id: 1, name: "ЖЕСТКИЙ КЛИН" },
    { id: 2, name: "ПОДВИЖНЫЙ КЛИН" },
    { id: 3, name: "ДВУХДИСКОВАЯ" },
    { id: 4, name: "ПАРАЛЛЕЛЬНЫЙ ДИСК" },
  ],
  diameters: [
    { id: 1, name: '1/2"' },
    { id: 2, name: '3/4"' },
    { id: 3, name: '1"' },
    { id: 4, name: '1"1/4"' },
    { id: 5, name: '1"1/2"' },
    { id: 6, name: '2"' },
    { id: 7, name: '2"1/2"' },
    { id: 8, name: '3"' },
    { id: 9, name: '4"' },
    { id: 10, name: '5"' },
    { id: 11, name: '6"' },
    { id: 12, name: '8"' },
    { id: 13, name: '10"' },
    { id: 14, name: '12"' },
    { id: 15, name: '14"' },
    { id: 16, name: '16"' },
    { id: 17, name: '18"' },
    { id: 18, name: '20"' },
    { id: 19, name: '24"' },
    { id: 20, name: '28"' },
    { id: 21, name: '30"' },
    { id: 22, name: '32"' },
    { id: 23, name: '36"' },
    { id: 24, name: '40"' },
    { id: 25, name: '42"' },
    { id: 26, name: '48"' },
  ],
  classPressures: [
    { id: 1, name: "150#" },
    { id: 2, name: "300#" },
    { id: 3, name: "600#" },
    { id: 4, name: "900#" },
    { id: 5, name: "1500#" },
    { id: 6, name: "2500#" },
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
    { id: 1, name: "WCB" },
    { id: 2, name: "LCB" },
    { id: 3, name: "WC6" },
    { id: 4, name: "C5" },
    { id: 5, name: "C12" },
    { id: 6, name: "CF8" },
    { id: 7, name: "CF8C" },
    { id: 8, name: "CF8M" },
    { id: 9, name: "CF3M" },
    { id: 10, name: "09Г2С" },
    { id: 11, name: "13ХФА" },
    { id: 12, name: "20" },
    { id: 13, name: "20Л" },
    { id: 14, name: "20ГЛ" },
  ],
  connectionTypes: [
    { id: 1, name: "ASME B16.5 RF" },
    { id: 2, name: "ASME B16.5 RTJ" },
    { id: 3, name: "ASME B16.47 RF" },
    { id: 4, name: "ASME B16.47 RTJ" },
    { id: 5, name: "BW TO ASME B16.25" },
    { id: 6, name: "ГОСТ 33259-2015 Тип B" },
    { id: 7, name: "ГОСТ 33259-2015 Тип E" },
    { id: 8, name: "ГОСТ 33259-2015 Тип F" },
    { id: 9, name: "ГОСТ 33259-2015 Тип J" },
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
  WCB: { rod: "F6A", wedge: "F6A", seat: "F6A" },
  LCB: { rod: "F6A", wedge: "F6A", seat: "F6A" },
  WC6: { rod: "F6A", wedge: "F6A", seat: "F6A" },
  C5: { rod: "F6A", wedge: "F6A", seat: "F6A" },
  C12: { rod: "F6A", wedge: "F6A", seat: "F6A" },
  CF8: { rod: "F304", wedge: "F304", seat: "F304" },
  CF8C: { rod: "F321", wedge: "F321", seat: "F321" },
  CF8M: { rod: "F316", wedge: "F316", seat: "F316" },
  CF3M: { rod: "F316L", wedge: "F316L", seat: "F316L" },
  "09Г2С": { rod: "30Х13", wedge: "30Х13+ТО", seat: "30Х13+ТО" },
  "08Х18Н10": { rod: "08Х18Н10", wedge: "08Х18Н10", seat: "08Х18Н10" },
  "20": { rod: "30Х13", wedge: "30Х13+ТО", seat: "20Х13" },
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
  "150#": {
    "RF|B": {
      '1/2"': 92,
      '3/4"': 111,
      '1"': 120,
      '1"1/4"': 120,
      '1"1/2"': 140,
      '2"': 178,
      '2"1/2"': 191,
      '3"': 203,
      '4"': 229,
      '5"': 254,
      '6"': 267,
      '8"': 292,
      '10"': 330,
      '12"': 356,
      '14"': 381,
      '16"': 406,
      '18"': 432,
      '20"': 457,
      '24"': 508,
      '28"': 610,
      '30"': 610,
      '32"': 660,
      '36"': 711,
      '40"': 762,
      '42"': 787,
      '48"': 864,
    },
    BW: {
      '1/2"': 92,
      '3/4"': 111,
      '1"': 120,
      '1"1/4"': 120,
      '1"1/2"': 140,
      '2"': 216,
      '2"1/2"': 241,
      '3"': 282,
      '4"': 305,
      '5"': 381,
      '6"': 403,
      '8"': 419,
      '10"': 457,
      '12"': 502,
      '14"': 571,
      '16"': 610,
      '18"': 660,
      '20"': 711,
      '24"': 813,
      '28"': 914,
      '30"': 914,
      '32"': 965,
      '36"': 1016,
      '40"': 1168,
      '42"': 1397,
      '48"': 1270,
    },
  },
  "300#": {
    "RF|B|BW": {
      '1/2"': 92,
      '3/4"': 111,
      '1"': 120,
      '1"1/4"': 120,
      '1"1/2"': 140,
      '2"': 216,
      '2"1/2"': 241,
      '3"': 282,
      '4"': 305,
      '5"': 381,
      '6"': 403,
      '8"': 419,
      '10"': 457,
      '12"': 502,
      '14"': 762,
      '16"': 838,
      '18"': 914,
      '20"': 991,
      '24"': 1143,
      '28"': 1346,
      '30"': 1397,
      '32"': 1524,
      '36"': 1727,
      '40"': 1930,
      '42"': 1981,
      '48"': 2235,
    },
    "RTJ|J": {
      '1/2"': 92,
      '3/4"': 111,
      '1"': 120,
      '1"1/4"': 120,
      '1"1/2"': 140,
      '2"': 232,
      '2"1/2"': 257,
      '3"': 298,
      '4"': 321,
      '5"': 397,
      '6"': 419,
      '8"': 435,
      '10"': 473,
      '12"': 518,
      '14"': 778,
      '16"': 854,
      '18"': 930,
      '20"': 1010,
      '24"': 1165,
      '28"': 1371,
      '30"': 1422,
      '32"': 1552,
      '36"': 1755,
    },
  },
  "600#": {
    "RF|B|BW": {
      '1/2"': 92,
      '3/4"': 111,
      '1"': 120,
      '1"1/4"': 120,
      '1"1/2"': 140,
      '2"': 292,
      '2"1/2"': 330,
      '3"': 356,
      '4"': 432,
      '5"': 508,
      '6"': 559,
      '8"': 660,
      '10"': 787,
      '12"': 838,
      '14"': 889,
      '16"': 991,
      '18"': 1092,
      '20"': 1194,
      '24"': 1397,
      '28"': 1549,
      '30"': 1651,
      '32"': 1778,
      '36"': 2082,
      '40"': 2286,
    },
    "RTJ|J": {
      '1/2"': 92,
      '3/4"': 111,
      '1"': 120,
      '1"1/4"': 120,
      '1"1/2"': 140,
      '2"': 295,
      '2"1/2"': 333,
      '3"': 359,
      '4"': 435,
      '5"': 511,
      '6"': 562,
      '8"': 663,
      '10"': 791,
      '12"': 841,
      '14"': 892,
      '16"': 994,
      '18"': 1095,
      '20"': 1200,
      '24"': 1407,
      '28"': 1562,
      '30"': 1664,
      '32"': 1794,
      '36"': 2099,
    },
  },
  "900#": {
    "RF|B|BW": {
      '3/4"': 120,
      '1"': 120,
      '1"1/4"': 140,
      '1"1/2"': 160,
      '2"': 368,
      '3"': 381,
      '4"': 457,
      '6"': 610,
      '8"': 737,
      '10"': 838,
      '12"': 965,
      '14"': 1029,
      '16"': 1130,
      '18"': 1219,
      '20"': 1321,
      '24"': 1549,
    },
    "RTJ|J": {
      '3/4"': 120,
      '1"': 120,
      '1"1/4"': 140,
      '1"1/2"': 160,
      '2"': 371,
      '3"': 384,
      '4"': 460,
      '6"': 613,
      '8"': 740,
      '10"': 841,
      '12"': 968,
      '14"': 1038,
      '16"': 1140,
      '18"': 1232,
      '20"': 1334,
      '24"': 1568,
    },
  },
  "1500#": {
    "RF|B|BW": {
      '3/4"': 120,
      '1"': 120,
      '1"1/4"': 140,
      '1"1/2"': 160,
      '2"': 368,
      '3"': 470,
      '4"': 546,
      '6"': 705,
      '8"': 832,
      '10"': 991,
      '12"': 1130,
      '14"': 1257,
      '16"': 1384,
      '18"': 1537,
      '20"': 1664,
      '24"': 1943,
    },
    "RTJ|J": {
      '3/4"': 120,
      '1"': 120,
      '1"1/4"': 140,
      '1"1/2"': 160,
      '2"': 371,
      '3"': 473,
      '4"': 549,
      '6"': 711,
      '8"': 842,
      '10"': 1000,
      '12"': 1146,
      '14"': 1276,
      '16"': 1407,
      '18"': 1559,
      '20"': 1686,
      '24"': 1972,
    },
  },
  "2500#": {
    "RF|B|BW": {
      '2"': 451,
      '3"': 578,
      '4"': 673,
      '6"': 914,
      '8"': 1022,
      '10"': 1270,
      '12"': 1422,
    },
    "RTJ|J": {
      '2"': 454,
      '3"': 584,
      '4"': 683,
      '6"': 927,
      '8"': 1038,
      '10"': 1292,
      '12"': 1445,
    },
  },
};
