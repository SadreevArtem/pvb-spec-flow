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
import {
  Drive,
  Item,
  OptionsType,
  WorkEnvironment,
} from "../../../../../shared/types";
import React, { useState } from "react";

type Props = {
  index: number;
  item: Item;
  setFormData: React.Dispatch<React.SetStateAction<Record<number, Item>>>;
  options: OptionsType;
};

export const UpdateForm: React.FC<Props> = ({ item, setFormData, options }) => {
  const [workEnvironment, setWorkEnvironment] = React.useState<WorkEnvironment>(
    item.workEnvironment
  );
  const [drive, setDrive] = React.useState<Drive>(item.drive);
  const [model, setModel] = useState(item.productType.model || "");
  // const [selectedMaterial, setSelectedMaterial] = useState(
  //   item.housingMaterial.id.toString() || "0"
  // );
  const handleChangeField =
    (fieldName: string) => (event: SelectChangeEvent) => {
      setFormData((prev) => ({
        ...prev,
        [item.id]: {
          ...prev[item.id],
          [fieldName]: event.target.value,
        },
      }));
    };

  const handleChangeProductType = (event: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      [item.id]: {
        ...prev[item.id],
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
  // const handleChangeDiameter = handleChangeField("diameterId");
  // const handleChangeClassPressure = handleChangeField("classPressureId");
  const handleChangeWorkEnvironment = (event: SelectChangeEvent) => {
    setWorkEnvironment(event.target.value as WorkEnvironment);
    setFormData((prev) => ({
      ...prev,
      [item.id]: {
        ...prev[item.id],
        workEnvironment: event.target.value as WorkEnvironment,
      },
    }));
  };
  const handleChangeDrive = (event: SelectChangeEvent) => {
    setDrive(event.target.value as Drive);
    setFormData((prev) => ({
      ...prev,
      [item.id]: {
        ...prev[item.id],
        drive: event.target.value as Drive,
      },
    }));
  };
  const handleChangeTightnessClass = handleChangeField("tightnessClassId");
  const handleChangeTemperatureRange = handleChangeField("temperatureRangeId");
  // const handleChangeHousingMaterial = handleChangeField("housingMaterialId");
  // const handleChangeRodMaterial = handleChangeField("rodMaterialId");
  // const handleChangeWedgeMaterial = handleChangeField("wedgeMaterialId");
  // const handleChangeSeatMaterial = handleChangeField("seatMaterialId");
  // const handleChangeCounterFlangesMaterial = handleChangeField(
  //   "counterFlangesMaterialId"
  // );
  // const handleChangeConnectionType = handleChangeField("connectionTypeId");
  // const handleChangePipeMaterial = handleChangeField("pipeMaterialId");
  return (
    <div key={item.id} className="w-fit">
      {/* <span className="bg-green-300 rounded-xl mb-2 inline-block px-3 sticky left-0">{`${
        currentTypes?.name
      } ${index + 1}`}</span> */}
      <div className="flex my-3">
        <TextField
          label="TAG номер"
          value={item.tagNumber}
          className="!mr-3 !min-w-[220px]"
          variant="outlined"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [item.id]: {
                ...prev[item.id],
                tagNumber: e.target.value,
              },
            }))
          }
        />
        <TextField
          label="Номер по ТЗ"
          defaultValue={item.techTaskNumber}
          variant="outlined"
          className="!mr-3 !min-w-[220px]"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [item.id]: {
                ...prev[item.id],
                techTaskNumber: e.target.value,
              },
            }))
          }
        />
        <FormControl required className="!mr-3 !w-[220px]">
          <InputLabel id="demo-simple-select-label">
            {"Тип продукции"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            key={item?.productType?.id?.toString() || ""}
            defaultValue={item?.productType?.id?.toString() || ""}
            id="demo-simple-select"
            label="Тип продукции"
            onChange={handleChangeProductType}
          >
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
          className="!mr-3 !min-w-[220px]"
          onChange={(e) => e.preventDefault()}
          value={model}
        />
        <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="demo-simple-select-label">{"Конструкция"}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            key={item?.construction?.id?.toString() || ""}
            defaultValue={item?.construction?.id?.toString() || ""}
            id="demo-simple-select"
            label="Конструкция"
            onChange={handleChangeConstructions}
          >
            {options.constructions.map((type, i) => (
              <MenuItem key={i} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="demo-simple-select-label">
            {"Стандарт изготовления"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={item?.manufacturingStandart?.id?.toString()}
            label="Стандарт изготовления"
            onChange={handleChangeManufacturingStandart}
          >
            {options.manufacturingStandart.map((type, i) => (
              <MenuItem key={i} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="demo-simple-select-label">{"Ду"}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={item?.diameter?.id?.toString()}
            label="Ду"
            onChange={handleChangeDiameter}
          >
            {options.diameters.map((type, i) => (
              <MenuItem key={i} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        {/* <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="demo-simple-select-label">{"Pу"}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={item?.classPressure?.id?.toString()}
            label="Pу"
            onChange={handleChangeClassPressure}
          >
            {options.classPressures.map((type, i) => (
              <MenuItem key={i} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <FormControl className="!mr-3 !min-w-[220px]">
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
          className="!mr-3 !min-w-[220px]"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [item.id]: {
                ...prev[item.id],
                temperature: e.target.value,
              },
            }))
          }
          value={item?.temperature || ""}
        />
        <FormControl className="!mr-3 !min-w-[220px]">
          <InputLabel id="demo-simple-select-label">
            {"Класс герметичности"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={item?.tightnessClass?.id?.toString()}
            label="Класс герметичности"
            onChange={handleChangeTightnessClass}
          >
            {options.tightnessClasses.map((type, i) => (
              <MenuItem key={i} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required className="!mr-3 !w-[220px]">
          <InputLabel id="temperature-range-select-label">
            {"Температурный диапазон"}
          </InputLabel>
          <Select
            labelId="temperature-range-select-label"
            id="temperature-range-select"
            defaultValue={item?.temperatureRange?.id?.toString()}
            label="Температурный диапазон"
            onChange={handleChangeTemperatureRange}
          >
            {options.temperatureRanges.map((range, i) => (
              <MenuItem key={i} value={range.id}>
                {range.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="housing-material-select-label">
            {"Материал корпуса"}
          </InputLabel> */}
        {/* <Select
            labelId="housing-material-select-label"
            id="housing-material-select"
            defaultValue={item?.housingMaterial?.id?.toString()}
            label="Материал корпуса"
            onChange={(e) => {
              handleChangeHousingMaterial(e);
              setSelectedMaterial(e.target.value);
            }}
          >
            {options.materials.map((material, i) => (
              <MenuItem key={i} value={material.id}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        {/* <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="housing-material-select-label">
            {"Материал штока"}
          </InputLabel>
          <Select
            labelId="housing-material-select-label"
            id="housing-material-select"
            defaultValue={item?.rodMaterial?.id?.toString()}
            label="Материал штока"
            onChange={handleChangeRodMaterial}
          >
            {options.materials.map((material, i) => (
              <MenuItem key={i} value={material.id}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        {/* <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="wedge-material-select-label">
            {"Материал клина"}
          </InputLabel>
          <Select
            labelId="wedge-material-select-label"
            id="wedge-material-select"
            defaultValue={item?.wedgeMaterial?.id?.toString()}
            label="Материал клина"
            onChange={handleChangeWedgeMaterial}
          >
            {options.materials.map((material, i) => (
              <MenuItem key={i} value={material.id}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        {/* <FormControl required className="!mr-3 !min-w-[220px]">
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
        </FormControl> */}
        {/* <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="seat-material-select-label">
            {"Материал седла"}
          </InputLabel>
          <Select
            labelId="seat-material-select-label"
            id="seat-material-select"
            defaultValue={item?.seatMaterial?.id?.toString()}
            label="Материал седла"
            onChange={handleChangeSeatMaterial}
          >
            {options.materials.map((material, i) => (
              <MenuItem key={i} value={material.id}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        {/* <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="connection-type-select-label">
            {"Тип соединения"}
          </InputLabel>
          <Select
            labelId="connection-type-select-label"
            id="connection-type-select"
            defaultValue={item?.connectionType?.id?.toString()}
            label="Тип соединения"
            onChange={handleChangeConnectionType}
          >
            {options.connectionTypes.map((type, i) => (
              <MenuItem key={i} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <TextField
          label="Строительная длина"
          variant="outlined"
          className="!mr-3 !min-w-[220px]"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [item.id]: {
                ...prev[item.id],
                constructionLength: e.target.value,
              },
            }))
          }
          value={item?.constructionLength || ""}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={item?.nace || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [item.id]: {
                    ...prev[item.id],
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
              checked={item?.counterFlanges || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [item.id]: {
                    ...prev[item.id],
                    counterFlanges: e.target.checked,
                  },
                }))
              }
            />
          }
          label="Ответные фланцы"
        />
        {/* <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="seat-material-select-label">
            {"Материал ответных фланцев"}
          </InputLabel>
          <Select
            labelId="seat-material-select-label"
            id="seat-material-select"
            value={item?.counterFlangesMaterial?.id?.toString()}
            label="Материал ответных фланцев"
            onChange={handleChangeCounterFlangesMaterial}
          >
            {options.materials.map((material, i) => (
              <MenuItem key={i} value={material.id}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <TextField
          label="Шпильки"
          variant="outlined"
          className="!mr-3 !min-w-[220px]"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [item.id]: {
                ...prev[item.id],
                hairpins: e.target.value,
              },
            }))
          }
          value={item?.hairpins || ""}
        />
        <TextField
          label="Гайки"
          variant="outlined"
          className="!mr-3 !min-w-[220px]"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [item.id]: {
                ...prev[item.id],
                nuts: e.target.value,
              },
            }))
          }
          value={item?.nuts || ""}
        />
        <TextField
          label="Размер трубы"
          variant="outlined"
          className="!mr-3 !min-w-[220px]"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [item.id]: {
                ...prev[item.id],
                pipeSize: e.target.value,
              },
            }))
          }
          value={item?.pipeSize || ""}
        />
        {/* <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="pipe-material-select-label">
            {"Материал трубы"}
          </InputLabel>
          <Select
            labelId="pipe-material-select-label"
            id="pipe-material-select"
            value={item?.pipeMaterial?.id?.toString()}
            label="Материал трубы"
            onChange={handleChangePipeMaterial}
          >
            {options.materials.map((material, i) => (
              <MenuItem key={i} value={material.id}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <FormControl className="!mr-3 !min-w-[220px]">
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
          className="!mr-3 !min-w-[220px]"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [item.id]: {
                ...prev[item.id],
                driveKit: e.target.value,
              },
            }))
          }
          value={item?.driveKit || ""}
        />
        <TextField
          label="Примечание"
          variant="outlined"
          className="!mr-3 !min-w-[220px]"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [item.id]: {
                ...prev[item.id],
                comment: e.target.value,
              },
            }))
          }
          value={item?.comment || ""}
        />
        <TextField
          variant="outlined"
          label={"количество"}
          className="!mr-3 !min-w-[220px]"
          type="number"
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [item.id]: {
                ...prev[item.id],
                count: +e.target.value,
              },
            }))
          }
          value={item?.count || ""}
        />
      </div>
    </div>
  );
};
