import { Item, OptionsType } from "../../../../../../../shared/types";
import {
  flangesMap,
  lengthTable,
  materialMap,
  staticOptions,
} from "../../../CreateForm/components/LiftCheckPressureSealStraight/static";
import { ZraComponentUpdate } from "../ZraComponentUpdate";

type Props = {
  index: number;
  item: Item;
  setFormData: React.Dispatch<React.SetStateAction<Record<number, Item>>>;
  options: OptionsType;
  formData: Item & { productTypeId?: number };
};

export const LiftCheckPressureSealStraight: React.FC<Props> = ({
  index,
  item,
  setFormData,
  formData,
  options,
}) => {
  return (
    <ZraComponentUpdate
      index={index}
      item={item}
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
