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
import { staticOptions } from "../Bellows/static";
import { useMaterialStore } from "../../../../../../../shared/stores/materials";
import { useMaterialFlangesStore } from "../../../../../../../shared/stores/materialsFlanges";

type Props = {
  index: number;
  setFormData: React.Dispatch<React.SetStateAction<Record<number, Item>>>;
  options: OptionsType;
  flangesMap: Record<string, FlangeMaterialEntry>;
  lengthTable: LengthTable;
  materialMap: Record<string, MaterialEntry>;
  staticOptions: typeof staticOptions;
  formData: Item & { productTypeId?: number };
};

export const ZraComponent: React.FC<Props> = ({
  index,
  setFormData,
  flangesMap,
  lengthTable,
  materialMap,
  staticOptions,
  formData,
  options,
}) => {
  const [workEnvironment, setWorkEnvironment] = React.useState<
    WorkEnvironment | ""
  >("");
  const { selectedMaterialStore, setSelectedMaterialStore } =
    useMaterialStore();
  const { selectedMaterialFlangesStore, setSelectedMaterialFlangesStore } =
    useMaterialFlangesStore();
  const [selectedMaterial, setSelectedMaterial] = useState(
    selectedMaterialStore || "0"
  );
  const [selectedFlanges, setSelectedFlanges] = useState(
    selectedMaterialFlangesStore || "0"
  );
  const [selectedMaterialsSeat, setSelectedMaterialsSeat] = useState("");
  const [driveKit, setDriveKit] = React.useState<string[]>([]);
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
      [index + 1]: {
        ...prev[index + 1],
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
      [index + 1]: {
        ...prev[index + 1],
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
    setSelectedMaterialsSeat(selectedMaterials?.seat);
  }, [
    selectedMaterials,
    setFormData,
    index,
    constructionLength,
    selectedMaterialFlanges,
  ]);
  useEffect(() => {
    if (formData?.workEnvironment) {
      setWorkEnvironment(formData.workEnvironment);
    }
    if (formData?.seatMaterial === "PTFE") {
      setFormData((prev) => ({
        ...prev,
        [index + 1]: {
          ...prev[index + 1],

          seatMaterial: "PTFE",
        },
      }));
      setSelectedMaterialsSeat("PTFE");
    }
    if (formData?.drive) {
      setDrive(formData?.drive);
    }
    if (formData?.driveKit) {
      setDriveKit(formData?.driveKit.split(","));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setSelectedMaterialStore(selectedMaterial);
  }, [selectedMaterial, setSelectedMaterialStore]);

  useEffect(() => {
    setSelectedMaterialFlangesStore(selectedFlanges);
  }, [selectedFlanges, setSelectedMaterialFlangesStore]);

  return (
    <>
      <FormControl required className={clsx("!mr-3 !w-[240px]", {})}>
        <InputLabel id="demo-simple-select-label">
          {t("type_of_organ")}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={formData?.typeOfOrgan}
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
          defaultValue={formData?.manufacturingStandart}
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
          defaultValue={formData?.diameter}
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
          defaultValue={formData?.classPressure}
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
          defaultValue={formData?.temperature}
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
          defaultValue={options.tightnessClasses
            .find((item) => item.id === formData?.tightnessClassId)
            ?.id.toString()}
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
          defaultValue={options.temperatureRanges
            .find((item) => item.id === formData?.temperatureRangeId)
            ?.id.toString()}
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
          defaultValue={formData?.housingMaterial}
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
                defaultChecked={formData?.seatMaterial === "PTFE"}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    [index + 1]: {
                      ...prev[index + 1],
                      seatMaterial: e.target.checked
                        ? "PTFE"
                        : selectedMaterials.seat,
                    },
                  }));
                  setSelectedMaterialsSeat(
                    e.target.checked ? "PTFE" : selectedMaterials?.seat
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
            defaultValue={formData?.rodMaterial}
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
            defaultValue={formData?.wedgeMaterial}
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
            defaultValue={formData?.seatMaterial}
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
              defaultValue={formData?.connectionType}
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
              defaultValue={formData?.counterFlangesMaterial}
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
            defaultValue={formData?.hairpins}
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
            defaultValue={formData?.nuts}
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
            defaultValue={formData?.pipeSize}
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
          <FormControl required className={clsx("!mr-3 !w-[240px]", {})}>
            <InputLabel id="pipe-material-select-label">
              {t("pipe_material")}
            </InputLabel>
            <Select
              labelId="pipe-material-select-label"
              id="pipe-material-select"
              defaultValue={formData?.pipeMaterial}
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
              defaultValue={formData?.drive}
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
              multiple
              value={driveKit}
              label={t("drive_kit")}
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
            defaultValue={formData?.comment}
            variant="outlined"
            className={clsx("!mr-3 !w-[240px]", {})}
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
            label={t("quantity")}
            defaultValue={formData?.count}
            className={clsx("!mr-3 !w-[240px]", {})}
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
