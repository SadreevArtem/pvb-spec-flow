import clsx from "clsx";
import { Item, OptionsType } from "../../../../../shared/types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { staticOptions } from "./static";

type Props = {
  index: number;
  setFormData: React.Dispatch<React.SetStateAction<Record<number, Item>>>;
  options: OptionsType;
  formData: Item & { productTypeId?: number };
};

export const BoltOnLid: React.FC<Props> = ({
  index,
  setFormData,
  formData,
  options,
}) => {
  const handleChangeField =
    (fieldName: string) => (event: SelectChangeEvent) => {
      setFormData((prev) => ({
        ...prev,
        [index + 1]: {
          ...prev[index + 1],
          [fieldName]: event.target.value,
        },
      }));
    };
  const handleChangeManufacturingStandart = handleChangeField(
    "manufacturingStandartId"
  );
  console.log(formData, options);

  return (
    <>
      <FormControl required className={clsx("!mr-3 !min-w-[220px]", {})}>
        <InputLabel id="dss-simple-select-label">
          {"Стандарт изготовления"}
        </InputLabel>
        <Select
          labelId="dss-simple-select-label"
          id="dss-simple-select"
          defaultValue={"0"}
          label="Стандарт изготовления"
          onChange={handleChangeManufacturingStandart}
        >
          <MenuItem value="0">Не выбрано</MenuItem>
          {staticOptions.manufacturingStandart.map((type, i) => (
            <MenuItem key={i} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
