import { References } from "@/components/RefernceBooks/types";

export const reference: {
  id: number;
  categoryName: References;
  value: { [key: string]: string };
}[] = [
  {
    id: 1,
    categoryName: "customers",
    value: { ru: "Заказчики", en: "Сustomers" },
  },
  {
    id: 2,
    categoryName: "equipmentType",
    value: { ru: "Вид оборудования", en: "Equipment Type" },
  },
  {
    id: 3,
    categoryName: "productType",
    value: { ru: "Тип продукции", en: "Product Type" },
  },
  {
    id: 4,
    categoryName: "construction",
    value: { ru: "Конструкция", en: "Construction" },
  },
  {
    id: 5,
    categoryName: "manufacturingStandart",
    value: { ru: "Стандарт изготовления", en: "Manufacturing Standart" },
  },
  {
    id: 6,
    categoryName: "diameters",
    value: { ru: "ДУ", en: "DN" },
  },
  {
    id: 7,
    categoryName: "class-pressure",
    value: { ru: "Ру", en: "CLASS" },
  },
  {
    id: 8,
    categoryName: "tightness-classes",
    value: { ru: "Класс герметичности", en: "Tightness class" },
  },
];
