import { Item, OptionsType } from "../../../../../../../shared/types";
import { ZraComponent } from "../ZraComponent";
import { flangesMap, lengthTable, materialMap, staticOptions } from "./static";

type Props = {
  index: number;
  setFormData: React.Dispatch<React.SetStateAction<Record<number, Item>>>;
  options: OptionsType;
  formData: Item & { productTypeId?: number };
};

export const LiftCheckPressureSealTypeY: React.FC<Props> = ({
  index,
  setFormData,
  formData,
  options,
}) => {
  return (
    <ZraComponent
      index={index}
      setFormData={setFormData}
      formData={formData}
      options={options}
      flangesMap={flangesMap}
      lengthTable={lengthTable}
      materialMap={materialMap}
      staticOptions={staticOptions}
    />
  );
};
