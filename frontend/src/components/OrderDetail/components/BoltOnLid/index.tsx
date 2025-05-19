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
  TextField,
} from "@mui/material";
import { materialMap, staticOptions } from "./static";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

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
  const [selectedMaterial, setSelectedMaterial] = useState("0");
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
  const handleChangeHousingMaterial = handleChangeField("housingMateria");
  const handleChangeTightnessClass = handleChangeField("tightnessClassId");
  const handleChangeTemperatureRange = handleChangeField("temperatureRangeId");

  const selectedMaterials = materialMap[selectedMaterial];
  console.log(formData, options, selectedMaterial);

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
      <FormControl className={clsx("!mr-3 !min-w-[220px]", {})}>
        <InputLabel id="demo-simple-select-label">
          {"Класс герметичности"}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={"0"}
          label="Класс герметичности"
          onChange={handleChangeTightnessClass}
        >
          <MenuItem value="0">Не выбрано</MenuItem>
          {options.tightnessClasses.map((type, i) => (
            <MenuItem key={i} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={clsx("!mr-3 !w-[240px]", {})}>
        <InputLabel id="temperature-range-select-label">
          {"Температурный диапазон"}
        </InputLabel>
        <Select
          labelId="temperature-range-select-label"
          id="temperature-range-select"
          defaultValue={"0"}
          label="Температурный диапазон"
          onChange={handleChangeTemperatureRange}
        >
          <MenuItem value="0">Не выбрано</MenuItem>
          {options.temperatureRanges.map((range, i) => (
            <MenuItem key={i} value={range.id}>
              {range.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={clsx("!mr-3 !min-w-[220px]", {})}>
        <InputLabel id="housing-material-select-label">
          {"Материал корпуса"}
        </InputLabel>
        <Select
          labelId="housing-material-select-label"
          id="housing-material-select"
          defaultValue={"0"}
          label="Материал корпуса"
          onChange={(e) => {
            handleChangeHousingMaterial(e);
            setSelectedMaterial(e.target.value);
          }}
        >
          <MenuItem value="0">Не выбрано</MenuItem>
          {staticOptions.materials.map((material, i) => (
            <MenuItem key={i} value={material.name}>
              {material.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedMaterial && (
        <>
          <TextField
            label="Материал штока"
            required
            variant="outlined"
            disabled
            className={clsx("!mr-3 !min-w-[220px]", {})}
            onChange={(e) => e.preventDefault()}
            value={selectedMaterials?.rod}
          />

          <TextField
            label="Материал клина"
            variant="outlined"
            required
            disabled
            className={clsx("!mr-3 !min-w-[220px]", {})}
            onChange={(e) => e.preventDefault()}
            value={selectedMaterials?.wedge}
          />
          <TextField
            label="Материал седла"
            variant="outlined"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            required
            className={clsx("!mr-3 !min-w-[220px]", {})}
            onChange={(e) => e.preventDefault()}
            value={selectedMaterials?.seat}
          />
        </>
      )}
    </>
  );
};
