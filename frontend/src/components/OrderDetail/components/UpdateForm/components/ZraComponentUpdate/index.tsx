import clsx from "clsx";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { getLength } from "@/components/OrderDetail/helpers";
import {
  Drive,
  FlangeMaterialEntry,
  Item,
  LengthTable,
  MaterialEntry,
  OptionsType,
  WorkEnvironment,
} from "../../../../../../../shared/types";
import { staticOptions } from "../../../CreateForm/components/BoltOnLid/static";

type Props = {
  index: number;
  item: Item;
  setFormData: React.Dispatch<React.SetStateAction<Record<number, Item>>>;
  options: OptionsType;
  flangesMap: Record<string, FlangeMaterialEntry>;
  lengthTable: LengthTable;
  materialMap: Record<string, MaterialEntry>;
  staticOptions: typeof staticOptions;
  formData: Item & { productTypeId?: number };
};

export const ZraComponentUpdate: React.FC<Props> = ({
  index,
  item,
  setFormData,
  formData,
  flangesMap,
  lengthTable,
  materialMap,
  staticOptions,
  options,
}) => {
  const [workEnvironment, setWorkEnvironment] = React.useState<
    WorkEnvironment | ""
  >(item.workEnvironment);
  const [selectedMaterial, setSelectedMaterial] = useState(
    item.housingMaterial
  );
  const [selectedMaterialsSeat, setSelectedMaterialsSeat] = useState(
    item.seatMaterial
  );

  const [selectedFlanges, setSelectedFlanges] = useState(
    item.counterFlangesMaterial
  );
  const [drive, setDrive] = React.useState<Drive | "manual">(item.drive);
  const [driveKit, setDriveKit] = React.useState<string[]>(
    item.driveKit?.split(",")
  );

  const t = useTranslations("OrderDetail");
  const handleChangeField =
    (fieldName: string) => (event: SelectChangeEvent) => {
      setFormData((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          [fieldName]: event.target.value,
        },
      }));
    };
  const handleChangeDrive = (event: SelectChangeEvent) => {
    setDrive(event.target.value as Drive);
    setFormData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        drive: event.target.value as Drive,
      },
    }));
  };
  const handleChangeWorkEnvironment = (event: SelectChangeEvent) => {
    setWorkEnvironment(event.target.value as WorkEnvironment);
    setFormData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        workEnvironment: event.target.value as WorkEnvironment,
      },
    }));
  };
  const handleChangeManufacturingStandart = handleChangeField(
    "manufacturingStandart"
  );
  const handleChangeTypeOfOrgan = handleChangeField("typeOfOrgan");
  const handleChangeDiameter = handleChangeField("diameter");
  const handleChangeClassPressure = handleChangeField("classPressure");
  const handleChangeTemperature = handleChangeField("temperature");
  const handleChangeHousingMaterial = handleChangeField("housingMaterial");
  const handleChangeTightnessClass = handleChangeField("tightnessClassId");
  const handleChangeTemperatureRange = handleChangeField("temperatureRangeId");
  const handleChangeConnectionType = handleChangeField("connectionType");
  const handleChangeCounterFlangesMaterial = handleChangeField(
    "counterFlangesMaterial"
  );
  const handleChangeDriveKit = (event: SelectChangeEvent<typeof driveKit>) => {
    const {
      target: { value },
    } = event;
    setDriveKit(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    const stringValue = typeof value === "string" ? value : value.join(",");

    setFormData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        driveKit: stringValue,
      },
    }));
  };
  const handleChangePipeMaterial = handleChangeField("pipeMaterial");
  const selectedMaterials = materialMap[selectedMaterial];
  const selectedMaterialFlanges = flangesMap[selectedFlanges];
  const constructionLength = getLength(
    formData.connectionType,
    formData.classPressure,
    formData.diameter,
    lengthTable
  );
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      [item.id]: {
        ...prev[item.id],
        rodMaterial: selectedMaterials?.rod,
        wedgeMaterial: selectedMaterials?.wedge,
        seatMaterial: selectedMaterials?.seat,
        constructionLength: constructionLength
          ? constructionLength.toString()
          : "",
        hairpins: selectedMaterialFlanges?.studs,
        nuts: selectedMaterialFlanges?.nuts,
      },
    }));
  }, [
    selectedMaterials,
    setFormData,
    item.id,
    constructionLength,
    selectedMaterialFlanges,
  ]);

  return (
    <>
      <FormControl required className={clsx("!mr-3 !w-[240px]", {})}>
        <InputLabel id="demo-simple-select-label">
          {t("type_of_organ")}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          key={item?.typeOfOrgan?.toString() || ""}
          defaultValue={item?.typeOfOrgan || ""}
          label={t("type_of_organ")}
          onChange={handleChangeTypeOfOrgan}
        >
          <MenuItem value="0">{t("not_selected")}</MenuItem>
          {staticOptions.typeOfOrgan.map((type, i) => (
            <MenuItem key={i} value={type.name}>
              {t(type.name)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={clsx("!mr-3 !w-[240px]", {})}>
        <InputLabel id="dss-simple-select-label">
          {t("manufacturing_standard")}
        </InputLabel>
        <Select
          labelId="dss-simple-select-label"
          id="dss-simple-select"
          key={item?.manufacturingStandart?.toString() || ""}
          defaultValue={item?.manufacturingStandart}
          label={t("manufacturing_standard")}
          onChange={handleChangeManufacturingStandart}
        >
          <MenuItem value="0">{t("not_selected")}</MenuItem>
          {staticOptions.manufacturingStandart.map((type, i) => (
            <MenuItem key={i} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={clsx("!mr-3 !w-[240px]", {})}>
        <InputLabel id="demo-simple-select-label">{t("diameter")}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={item?.diameter}
          label={t("diameter")}
          onChange={handleChangeDiameter}
        >
          <MenuItem value="0">{t("not_selected")}</MenuItem>
          {staticOptions.diameters.map((type, i) => (
            <MenuItem key={i} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={clsx("!mr-3 !w-[240px]", {})}>
        <InputLabel id="demo-simple-select-label">
          {t("class_pressure")}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={item?.classPressure}
          label={t("class_pressure")}
          onChange={handleChangeClassPressure}
        >
          <MenuItem value="0">{t("not_selected")}</MenuItem>
          {staticOptions.classPressures.map((type, i) => (
            <MenuItem key={i} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={clsx("!mr-3 !w-[240px]", {})}>
        <InputLabel id="demo-simple-select-label">
          {t("work_environment")}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={workEnvironment}
          defaultValue={item?.workEnvironment}
          label={t("work_environment")}
          onChange={handleChangeWorkEnvironment}
        >
          {Object.values(WorkEnvironment).map((item, i) => (
            <MenuItem key={i} value={item}>
              {t(item)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={clsx("!mr-3 !w-[240px]", {})}>
        <InputLabel id="demo-simple-select-label">
          {t("temperature")}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={item?.temperature}
          label={t("temperature")}
          onChange={handleChangeTemperature}
        >
          <MenuItem value="0">{t("not_selected")}</MenuItem>
          {staticOptions.temperature.map((type, i) => (
            <MenuItem key={i} value={type.name}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={clsx("!mr-3 !w-[240px]", {})}>
        <InputLabel id="demo-simple-select-label">
          {t("tightness_class")}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={item?.tightnessClass?.id.toString()}
          label={t("tightness_class")}
          onChange={handleChangeTightnessClass}
        >
          <MenuItem value="0">{t("not_selected")}</MenuItem>
          {options.tightnessClasses.map((type, i) => (
            <MenuItem key={i} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={clsx("!mr-3 !w-[240px]", {})}>
        <InputLabel id="temperature-range-select-label">
          {t("temperature_range")}
        </InputLabel>
        <Select
          labelId="temperature-range-select-label"
          id="temperature-range-select"
          defaultValue={item?.temperatureRange?.id.toString()}
          label={t("temperature_range")}
          onChange={handleChangeTemperatureRange}
        >
          <MenuItem value="0">{t("not_selected")}</MenuItem>
          {options.temperatureRanges.map((range, i) => (
            <MenuItem key={i} value={range.id}>
              {range.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl required className={clsx("!mr-3 !w-[240px]", {})}>
        <InputLabel id="housing-material-select-label">
          {t("housing_material")}
        </InputLabel>
        <Select
          labelId="housing-material-select-label"
          id="housing-material-select"
          defaultValue={item?.housingMaterial}
          label={t("housing_material")}
          onChange={(e) => {
            handleChangeHousingMaterial(e);
            setSelectedMaterial(e.target.value);
          }}
        >
          <MenuItem value="0">{t("not_selected")}</MenuItem>
          {staticOptions.materials.map((material, i) => (
            <MenuItem key={i} value={material.name}>
              {material.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedMaterial && (
        <>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedMaterialsSeat === "PTFE"}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    [index]: {
                      ...prev[index],
                      seatMaterial: e.target.checked
                        ? "PTFE"
                        : selectedMaterials.seat,
                    },
                  }));
                  setSelectedMaterialsSeat(
                    e.target.checked ? "PTFE" : selectedMaterials.seat
                  );
                }}
              />
            }
            label={t("soft_seat")}
          />
          <TextField
            label={t("rod_material")}
            required
            className={clsx("!mr-3 !w-[240px]", {})}
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
            label={t("wedge_material")}
            className={clsx("!mr-3 !w-[240px]", {})}
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
            label={t("seat_material")}
            variant="outlined"
            className={clsx("!mr-3 !w-[240px]", {})}
            value={selectedMaterialsSeat}
            id="outlined-multiline-static-seat"
            slotProps={{
              input: { readOnly: true },
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <FormControl required className={clsx("!mr-3 !w-[240px]", {})}>
            <InputLabel id="connection-type-select-label">
              {t("connection_type")}
            </InputLabel>
            <Select
              labelId="connection-type-select-label"
              id="connection-type-select"
              defaultValue={item?.connectionType}
              label={t("connection_type")}
              onChange={handleChangeConnectionType}
            >
              <MenuItem value="0">{t("not_selected")}</MenuItem>
              {staticOptions.connectionTypes.map((type, i) => (
                <MenuItem key={i} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required className={clsx("!mr-3 !w-[240px]", {})}>
            <InputLabel id="seat-material-select-label">
              {t("counter_flanges_material")}
            </InputLabel>
            <Select
              labelId="flanges-material-select-label"
              id="seat-material-select"
              defaultValue={item?.counterFlangesMaterial}
              label={t("counter_flanges_material")}
              onChange={(e) => {
                handleChangeCounterFlangesMaterial(e);
                setSelectedFlanges(e.target.value);
              }}
            >
              <MenuItem value="0">{t("not_selected")}</MenuItem>
              {staticOptions.materialsFlanges.map((material, i) => (
                <MenuItem key={i} value={material.name}>
                  {material.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label={t("studs")}
            className={clsx("!mr-3 !w-[240px]", {})}
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
            label={t("nuts")}
            variant="outlined"
            className={clsx("!mr-3 !w-[240px]", {})}
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
            label={t("construction_length")}
            variant="outlined"
            className={clsx("!mr-3 !w-[240px]", {})}
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
            label={t("pipe_size")}
            variant="outlined"
            className={clsx("!mr-3 !w-[240px]", {})}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [item.id]: {
                  ...prev[item.id],
                  pipeSize: e.target.value,
                },
              }))
            }
            defaultValue={item?.pipeSize || ""}
          />
          <FormControl required className={clsx("!mr-3 !w-[240px]", {})}>
            <InputLabel id="pipe-material-select-label">
              {t("pipe_material")}
            </InputLabel>
            <Select
              labelId="pipe-material-select-label"
              id="pipe-material-select"
              defaultValue={item?.pipeMaterial}
              label={t("pipe_material")}
              onChange={handleChangePipeMaterial}
            >
              <MenuItem value="0">{t("not_selected")}</MenuItem>
              {staticOptions.materials.map((material, i) => (
                <MenuItem key={i} value={material.name}>
                  {material.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={clsx("!mr-3 !w-[240px]", {})}>
            <InputLabel id="demo-simple-select-label">{t("drive")}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={drive}
              label={t("drive")}
              onChange={handleChangeDrive}
            >
              {Object.values(Drive).map((item, i) => (
                <MenuItem key={i} value={item}>
                  {t(item)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required className={clsx("!mr-3 !w-[240px]", {})}>
            <InputLabel id="demo-simple-select-label">
              {t("drive_kit")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-kit"
              defaultValue={item.driveKit?.split(",") || []}
              label={t("drive_kit")}
              multiple
              value={driveKit}
              onChange={handleChangeDriveKit}
            >
              {staticOptions.driveKit.map((type, i) => (
                <MenuItem key={i} value={type.name}>
                  {t(type.name)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label={t("comment")}
            variant="outlined"
            className={clsx("!mr-3 !w-[240px]", {})}
            defaultValue={item?.comment}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [item.id]: {
                  ...prev[item.id],
                  comment: e.target.value,
                },
              }))
            }
          />
          <TextField
            variant="outlined"
            label={t("quantity")}
            className={clsx("!mr-3 !w-[240px]", {})}
            type="number"
            defaultValue={item?.count}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [item.id]: {
                  ...prev[item.id],
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
