import clsx from "clsx";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { flangesMap, lengthTable, materialMap, staticOptions } from "./static";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { getLength } from "@/components/OrderDetail/helpers";
import {
  Drive,
  Item,
  OptionsType,
  WorkEnvironment,
} from "../../../../../../../shared/types";

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
  const [selectedFlanges, setSelectedFlanges] = useState("0");
  const [drive, setDrive] = React.useState<Drive | "manual">("manual");
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
  const handleChangeDrive = (event: SelectChangeEvent) => {
    setDrive(event.target.value as Drive);
    setFormData((prev) => ({
      ...prev,
      [index + 1]: {
        ...prev[index + 1],
        drive: event.target.value as Drive,
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
  const handleChangeConnectionType = handleChangeField("connectionType");
  const handleChangeCounterFlangesMaterial = handleChangeField(
    "counterFlangesMaterial"
  );
  const handleChangeDriveKit = handleChangeField("driveKit");
  const handleChangePipeMaterial = handleChangeField("pipeMaterial");
  const selectedMaterials = materialMap[selectedMaterial];
  const selectedMaterialFlanges = flangesMap[selectedFlanges];
  // console.log(formData, options, selectedMaterialFlanges);
  const constructionLength = getLength(
    formData.connectionType,
    formData.classPressure,
    formData.diameter,
    lengthTable
  );

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
            className={clsx("!mr-3 !min-w-[220px]", {})}
            value={selectedMaterials?.rod}
            id="outlined-multiline-static"
            slotProps={{
              input: { readOnly: true },
              inputLabel: {
                shrink: true,
              },
            }}
          />

          <TextField
            label="Материал клина"
            className={clsx("!mr-3 !min-w-[220px]", {})}
            value={selectedMaterials?.wedge}
            id="outlined-multiline-static-wedge"
            slotProps={{
              input: { readOnly: true },
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            label="Материал седла"
            variant="outlined"
            className={clsx("!mr-3 !min-w-[220px]", {})}
            value={selectedMaterials?.seat}
            id="outlined-multiline-static-seat"
            slotProps={{
              input: { readOnly: true },
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <FormControl required className={clsx("!mr-3 !min-w-[220px]", {})}>
            <InputLabel id="connection-type-select-label">
              {"Тип соединения"}
            </InputLabel>
            <Select
              labelId="connection-type-select-label"
              id="connection-type-select"
              defaultValue={"0"}
              label="Тип соединения"
              onChange={handleChangeConnectionType}
            >
              <MenuItem value="0">Не выбрано</MenuItem>
              {staticOptions.connectionTypes.map((type, i) => (
                <MenuItem key={i} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required className={clsx("!mr-3 !min-w-[220px]", {})}>
            <InputLabel id="seat-material-select-label">
              {"Материал ответных фланцев"}
            </InputLabel>
            <Select
              labelId="flanges-material-select-label"
              id="seat-material-select"
              defaultValue={"0"}
              label="Материал ответных фланцев"
              onChange={(e) => {
                handleChangeCounterFlangesMaterial(e);
                setSelectedFlanges(e.target.value);
              }}
            >
              <MenuItem value="0">Не выбрано</MenuItem>
              {staticOptions.materialsFlanges.map((material, i) => (
                <MenuItem key={i} value={material.name}>
                  {material.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Шпильки"
            className={clsx("!mr-3 !min-w-[220px]", {})}
            value={selectedMaterialFlanges?.studs}
            id="outlined-multiline-static-wedge"
            slotProps={{
              input: { readOnly: true },
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            label="Гайки"
            variant="outlined"
            className={clsx("!mr-3 !min-w-[220px]", {})}
            value={selectedMaterialFlanges?.nuts}
            id="outlined-multiline-static-seat"
            slotProps={{
              input: { readOnly: true },
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            label="Строительная длина"
            variant="outlined"
            className={clsx("!mr-3 !min-w-[220px]", {})}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [index + 1]: {
                  ...prev[index + 1],
                  constructionLength:
                    constructionLength?.toString() || e.target.value,
                },
              }))
            }
            slotProps={{
              input: { readOnly: true },
              inputLabel: {
                shrink: true,
              },
            }}
            value={constructionLength?.toString() || ""}
          />
          <TextField
            label="Размер трубы"
            variant="outlined"
            className={clsx("!mr-3 !min-w-[220px]", {})}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [index + 1]: {
                  ...prev[index + 1],
                  pipeSize: e.target.value,
                },
              }))
            }
            // value={formData?.pipeSize || ""}
          />
          <FormControl required className={clsx("!mr-3 !min-w-[220px]", {})}>
            <InputLabel id="pipe-material-select-label">
              {"Материал трубы"}
            </InputLabel>
            <Select
              labelId="pipe-material-select-label"
              id="pipe-material-select"
              defaultValue={"0"}
              label="Материал трубы"
              onChange={handleChangePipeMaterial}
            >
              <MenuItem value="0">Не выбрано</MenuItem>
              {staticOptions.materials.map((material, i) => (
                <MenuItem key={i} value={material.name}>
                  {material.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={clsx("!mr-3 !min-w-[220px]", {})}>
            <InputLabel id="demo-simple-select-label">{"Привод"}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={drive}
              label="Привод"
              onChange={handleChangeDrive}
            >
              {Object.values(Drive).map((item, i) => (
                <MenuItem key={i} value={item}>
                  {t(item)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required className={clsx("!mr-3 !min-w-[220px]", {})}>
            <InputLabel id="demo-simple-select-label">
              {"Комплект привода"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-kit"
              defaultValue={"0"}
              label="Комплект привода"
              onChange={handleChangeDriveKit}
            >
              <MenuItem value="0">Не выбрано</MenuItem>
              {staticOptions.driveKit.map((type, i) => (
                <MenuItem key={i} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Примечание"
            variant="outlined"
            className={clsx("!mr-3 !min-w-[220px]", {})}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [index + 1]: {
                  ...prev[index + 1],
                  comment: e.target.value,
                },
              }))
            }
          />
          <TextField
            variant="outlined"
            label={"количество"}
            className={clsx("!mr-3 !min-w-[220px]", {})}
            type="number"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [index + 1]: {
                  ...prev[index + 1],
                  count: +e.target.value,
                },
              }))
            }
          />
        </>
      )}
    </>
  );
};
