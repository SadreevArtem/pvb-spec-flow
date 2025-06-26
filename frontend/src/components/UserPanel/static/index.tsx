export const menuUser: {
  id: number;
  name: string;
  value: { [key: string]: string };
}[] = [
  {
    id: 2,
    name: "orders",
    value: { ru: "Заказы", en: "Orders" },
  },
  // {
  //   id: 3,
  //   name: "reference",
  //   value: { ru: "Справочники", en: "Reference books" },
  // },
  {
    id: 4,
    name: "account",
    value: { ru: "Личный кабинет", en: "Account" },
  },
];

export const menuUserNotAccess: {
  id: number;
  name: string;
  value: { [key: string]: string };
}[] = [
  {
    id: 4,
    name: "account",
    value: { ru: "Личный кабинет", en: "Account" },
  },
];
