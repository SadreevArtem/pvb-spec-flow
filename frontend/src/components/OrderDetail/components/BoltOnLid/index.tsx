import clsx from "clsx";
import {
  Item,
  OptionsType,
  WorkEnvironment,
} from "../../../../../shared/types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { staticOptions } from "./static";
import { useTranslations } from "next-intl";
import React from "react";

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
  const [workEnvironment, setWorkEnvironment] = React.useState<
    WorkEnvironment | ""
  >("");
  const t = useTranslations("OrderDetail");
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
  const handleChangeWorkEnvironment = (event: SelectChangeEvent) => {
    setWorkEnvironment(event.target.value as WorkEnvironment);
    setFormData((prev) => ({
      ...prev,
      [index + 1]: {
        ...prev[index + 1],
        workEnvironment: event.target.value as WorkEnvironment,
      },
    }));
  };
  const handleChangeManufacturingStandart = handleChangeField(
    "manufacturingStandartId"
  );
  const handleChangeTypeOfOrgan = handleChangeField("typeOfOrgan");
  const handleChangeDiameter = handleChangeField("diameter");
  const handleChangeClassPressure = handleChangeField("classPressure");
  const handleChangeTemperature = handleChangeField("temperature");
  console.log(formData, options);

  return (
    <>
      <FormControl required className={clsx("!mr-3 !min-w-[220px]", {})}>
        <InputLabel id="demo-simple-select-label">
          {"Тип запорного органа"}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={"0"}
          label="Тип запорного органа"
          onChange={handleChangeTypeOfOrgan}
        >
          <MenuItem value="0">Не выбрано</MenuItem>
          {staticOptions.typeOfOrgan.map((type, i) => (
            <MenuItem key={i} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
      <FormControl required className={clsx("!mr-3 !min-w-[220px]", {})}>
        <InputLabel id="demo-simple-select-label">{"Ду"}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={"0"}
          label="Ду"
          onChange={handleChangeDiameter}
        >
          <MenuItem value="0">Не выбрано</MenuItem>
          {staticOptions.diameters.map((type, i) => (
            <MenuItem key={i} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={clsx("!mr-3 !min-w-[220px]", {})}>
        <InputLabel id="demo-simple-select-label">{"Pу"}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={"0"}
          label="Pу"
          onChange={handleChangeClassPressure}
        >
          <MenuItem value="0">Не выбрано</MenuItem>
          {staticOptions.classPressures.map((type, i) => (
            <MenuItem key={i} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={clsx("!mr-3 !min-w-[220px]", {})}>
        <InputLabel id="demo-simple-select-label">{"Рабочая среда"}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={workEnvironment}
          label="Рабочая среда"
          onChange={handleChangeWorkEnvironment}
        >
          {Object.values(WorkEnvironment).map((item, i) => (
            <MenuItem key={i} value={item}>
              {t(item)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={clsx("!mr-3 !min-w-[220px]", {})}>
        <InputLabel id="demo-simple-select-label">
          {"Температура рабочей среды"}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={"0"}
          label="Температура рабочей среды"
          onChange={handleChangeTemperature}
        >
          <MenuItem value="0">Не выбрано</MenuItem>
          {staticOptions.temperature.map((type, i) => (
            <MenuItem key={i} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
