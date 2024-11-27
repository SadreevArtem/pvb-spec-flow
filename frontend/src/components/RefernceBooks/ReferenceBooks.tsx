import React from "react";
import { Tabs } from "./components/Tabs/Tabs";
import { useReferenceTabsStore } from "../../../shared/stores/referenceTabs";
import { Customers } from "../Customers/Customers";
import { EquipmentTypeComponent } from "../EquipmentType/EquipmentType";
import { ProductTypeComponent } from "../ProductType/ProductType";

export const ReferenceBooks = () => {
  const currentTab = useReferenceTabsStore((state) => state.currentTab);
  const renderContent = () => {
    console.log("Current Tab:", currentTab);
    switch (currentTab) {
      case "customers":
        return <Customers />;
      case "equipmentType":
        return <EquipmentTypeComponent />;
      case "productType":
        return <ProductTypeComponent />;
      default:
        return null; // Возвращает null, если нет совпадений
    }
  };
  const currentComponent = renderContent();

  return (
    <>
      <Tabs />
      <div className="w-full">{currentComponent}</div>
    </>
  );
};
