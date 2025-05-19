import React from "react";
import { Tabs } from "./components/Tabs/Tabs";
import { useReferenceTabsStore } from "../../../shared/stores/referenceTabs";
import { Customers } from "../Customers/Customers";
import { EquipmentTypeComponent } from "../EquipmentType/EquipmentType";
import { ProductTypeComponent } from "../ProductType/ProductType";
import { ConstructionComponent } from "../ConstructionComponent/ConstructionComponent";
// import { ManufacturingStandartComponent } from "../ManufacturingStandartComponent/ManufacturingStandartComponent";
import { TightnessClassesComponent } from "../TightnessClassesComponent/TightnessClassesComponent";
import { TemperatureRangeComponent } from "../TemperatureRangesComponent/TemperatureRangesComponent";

export const ReferenceBooks = () => {
  const currentTab = useReferenceTabsStore((state) => state.currentTab);
  const renderContent = () => {
    switch (currentTab) {
      case "customers":
        return <Customers />;
      case "equipmentType":
        return <EquipmentTypeComponent />;
      case "productType":
        return <ProductTypeComponent />;
      case "construction":
        return <ConstructionComponent />;
      // case "manufacturingStandart":
      //   return <ManufacturingStandartComponent />;
      case "tightness-classes":
        return <TightnessClassesComponent />;
      case "temperature-ranges":
        return <TemperatureRangeComponent />;
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
