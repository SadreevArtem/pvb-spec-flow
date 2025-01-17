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
import React, { useState } from "react";
import {
  Drive,
  EquipmentType,
  Item,
  OptionsType,
  WorkEnvironment,
} from "../../../../../shared/types";
// import { Button } from "@/components/Button";
import clsx from "clsx";

type Props = {
  index: number;
  currentTypes: EquipmentType | undefined;
  setFormData: React.Dispatch<React.SetStateAction<Record<number, Item>>>;
  options: OptionsType;
  formData: Item;
};
const CreateForm: React.FC<Props> = React.memo(
  ({ index, currentTypes, setFormData, formData, options }) => {
    const [workEnvironment, setWorkEnvironment] = React.useState<
      WorkEnvironment | ""
    >("");
    const [drive, setDrive] = React.useState<Drive | "manual">("manual");

    const [model, setModel] = useState("");
    const [selectedMaterial, setSelectedMaterial] = useState("0");
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

    const handleChangeProductType = (event: SelectChangeEvent) => {
      setFormData((prev) => ({
        ...prev,
        [index + 1]: {
          ...prev[index + 1],
          productTypeId: event.target.value,
        },
      }));
      const modelName = options.productTypes.find(
        (productType) => productType.id === +event.target.value
      );
      setModel(modelName?.model || "");
    };
    const handleChangeConstructions = handleChangeField("constructionId");
    const handleChangeManufacturingStandart = handleChangeField(
      "manufacturingStandartId"
    );
    const handleChangeDiameter = handleChangeField("diameterId");
    const handleChangeClassPressure = handleChangeField("classPressureId");
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
    const handleChangeTightnessClass = handleChangeField("tightnessClassId");
    const handleChangeTemperatureRange =
      handleChangeField("temperatureRangeId");
    const handleChangeHousingMaterial = handleChangeField("housingMaterialId");
    const handleChangeWedgeMaterial = handleChangeField("wedgeMaterialId");
    const handleChangeSeatMaterial = handleChangeField("seatMaterialId");
    const handleChangeCounterFlangesMaterial = handleChangeField(
      "counterFlangesMaterialId"
    );
    const handleChangeConnectionType = handleChangeField("connectionTypeId");
    const handleChangePipeMaterial = handleChangeField("pipeMaterialId");
    return (
      <div key={index} className="w-fit">
        {currentTypes && (
          <span className="bg-green-300 rounded-xl mb-2 inline-block px-3 sticky left-0">{`${
            currentTypes?.name
          } ${index + 1}`}</span>
        )}
        <div className="flex my-3 gap-4">
          <TextField
            label={"TAG номер"}
            className="!mr-3 !min-w-[220px]"
            variant="outlined"
            required
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [index + 1]: {
                  ...prev[index + 1],
                  tagNumber: e.target.value,
                },
              }))
            }
            defaultValue={formData?.tagNumber || ""}
          />

          {/* <Button
              title="fill add"
              className={clsx("mb-3", { hidden: index !== 0 })}
              onButtonClick={() => {
                // const fillValue = formData?.techTaskNumber || ""; // Берем значение из текущего поля
                // setFormData((prev) => {
                //   const updatedFormData = {};
                //   // Object.keys(prev).forEach((key) => {
                //   //   updatedFormData[+key] = {
                //   //     ...prev[+key],
                //   //     techTaskNumber: fillValue, // Присваиваем значение всем объектам
                //   //   };
                //   // });
                //   return updatedFormData;
                // });
              }}
            /> */}
          <TextField
            label={"Номер по ТЗ"}
            variant="outlined"
            // defaultValue={formData?.techTaskNumber || undefined}
            className="!mr-3 !min-w-[220px]"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [index + 1]: {
                  ...prev[index + 1],
                  techTaskNumber: e.target.value,
                },
              }))
            }
            // value={formData?.techTaskNumber || ""}
          />

          <FormControl required className="!mr-3 !w-[240px]">
            <InputLabel id="demo-simple-select-label">
              {"Тип продукции"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"0"}
              label="Тип продукции"
              onChange={handleChangeProductType}
            >
              <MenuItem value="0">Не выбрано</MenuItem>
              {options.productTypes.map((type, i) => (
                <MenuItem key={i} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label={"Модель"}
            variant="outlined"
            disabled
            className={clsx("!mr-3 !min-w-[220px]", {})}
            onChange={(e) => e.preventDefault()}
            value={model}
          />
          <FormControl required className={clsx("!mr-3 !min-w-[220px]", {})}>
            <InputLabel id="demo-simple-select-label">
              {"Конструкция"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"0"}
              label="Конструкция"
              onChange={handleChangeConstructions}
            >
              <MenuItem value="0">Не выбрано</MenuItem>
              {options.constructions.map((type, i) => (
                <MenuItem key={i} value={type.id}>
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
              {options.manufacturingStandart.map((type, i) => (
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
              {options.diameters.map((type, i) => (
                <MenuItem key={i} value={type.id}>
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
              {options.classPressures.map((type, i) => (
                <MenuItem key={i} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={clsx("!mr-3 !min-w-[220px]", {})}>
            <InputLabel id="demo-simple-select-label">
              {"Рабочая среда"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={workEnvironment}
              label="Рабочая среда"
              onChange={handleChangeWorkEnvironment}
            >
              {Object.values(WorkEnvironment).map((item, i) => (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Температура рабочей среды"
            variant="outlined"
            className={clsx("!mr-3 !min-w-[220px]", {})}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [index + 1]: {
                  ...prev[index + 1],
                  temperature: e.target.value,
                },
              }))
            }
            // value={formData?.temperature || ""}
          />
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
              {options.materials.map((material, i) => (
                <MenuItem key={i} value={material.id}>
                  {material.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required className={clsx("!mr-3 !min-w-[220px]", {})}>
            <InputLabel id="housing-material-select-label">
              {"Материал штока"}
            </InputLabel>
            <Select
              labelId="housing-material-select-label"
              id="housing-material-select"
              defaultValue={"0"}
              label="Материал штока"
              onChange={handleChangeField("rodMaterialId")}
            >
              <MenuItem value="0">Не выбрано</MenuItem>
              {options.materials.map((material, i) => (
                <MenuItem key={i} value={material.id}>
                  {material.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required className={clsx("!mr-3 !min-w-[220px]", {})}>
            <InputLabel id="wedge-material-select-label">
              {"Материал клина"}
            </InputLabel>
            <Select
              labelId="wedge-material-select-label"
              id="wedge-material-select"
              defaultValue={"0"}
              label="Материал клина"
              onChange={handleChangeWedgeMaterial}
            >
              <MenuItem value="0">Не выбрано</MenuItem>
              {options.materials.map((material, i) => (
                <MenuItem key={i} value={material.id}>
                  {material.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required className={clsx("!mr-3 !min-w-[220px]", {})}>
            <InputLabel id="seat-material-select-label">
              {"Материал седла"}
            </InputLabel>
            <Select
              labelId="seat-material-select-label"
              id="seat-material-select"
              defaultValue={"0"}
              value={selectedMaterial}
              disabled
              label="Материал седла"
              onChange={handleChangeSeatMaterial}
            >
              <MenuItem value="0">Не выбрано</MenuItem>
              {options.materials.map((material, i) => (
                <MenuItem key={i} value={material.id}>
                  {material.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              {options.connectionTypes.map((type, i) => (
                <MenuItem key={i} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Строительная длина"
            variant="outlined"
            className={clsx("!mr-3 !min-w-[220px]", {})}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [index + 1]: {
                  ...prev[index + 1],
                  constructionLength: e.target.value,
                },
              }))
            }
            // value={formData?.constructionLength || ""}
          />
          <FormControlLabel
            control={
              <Checkbox
                // checked={false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [index + 1]: {
                      ...prev[index + 1],
                      nace: e.target.checked,
                    },
                  }))
                }
              />
            }
            label="NACE"
          />
          <FormControlLabel
            control={
              <Checkbox
                // checked={false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [index + 1]: {
                      ...prev[index + 1],
                      counterFlanges: e.target.checked,
                    },
                  }))
                }
              />
            }
            label="Ответные фланцы"
          />
          <FormControl required className={clsx("!mr-3 !min-w-[220px]", {})}>
            <InputLabel id="seat-material-select-label">
              {"Материал ответных фланцев"}
            </InputLabel>
            <Select
              labelId="seat-material-select-label"
              id="seat-material-select"
              defaultValue={"0"}
              label="Материал ответных фланцев"
              onChange={handleChangeCounterFlangesMaterial}
            >
              <MenuItem value="0">Не выбрано</MenuItem>
              {options.materials.map((material, i) => (
                <MenuItem key={i} value={material.id}>
                  {material.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Шпильки"
            variant="outlined"
            className={clsx("!mr-3 !min-w-[220px]", {})}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [index + 1]: {
                  ...prev[index + 1],
                  hairpins: e.target.value,
                },
              }))
            }
            // value={formData?.hairpins || ""}
          />
          <TextField
            label="Гайки"
            variant="outlined"
            className={clsx("!mr-3 !min-w-[220px]", {})}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [index + 1]: {
                  ...prev[index + 1],
                  nuts: e.target.value,
                },
              }))
            }
            // value={formData?.nuts || ""}
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
              {options.materials.map((material, i) => (
                <MenuItem key={i} value={material.id}>
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
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Комплект привода"
            variant="outlined"
            className={clsx("!mr-3 !min-w-[220px]", {})}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [index + 1]: {
                  ...prev[index + 1],
                  driveKit: e.target.value,
                },
              }))
            }
            // value={formData?.driveKit || ""}
          />
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
            // value={formData?.comment || ""}
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
        </div>
      </div>
    );
  }
);

CreateForm.displayName = "export default ";

export default CreateForm;
