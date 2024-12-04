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
  ClassPressureType,
  ConnectionType,
  ConstructionType,
  DiameterType,
  Drive,
  EquipmentType,
  Item,
  ManufacturingStandartType,
  MaterialType,
  ProductType,
  TemperatureRangeType,
  TightnessClassType,
  WorkEnvironment,
} from "../../../../../shared/types";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../../../shared/stores/auth";
import { api } from "../../../../../shared/api/api";
import React, { useState } from "react";

type Props = {
  index: number;
  currentTypes: EquipmentType | undefined;
  item: Item;
  setFormData: React.Dispatch<React.SetStateAction<Record<number, Item>>>;
};

export const UpdateForm: React.FC<Props> = ({
  currentTypes,
  item,
  index,
  setFormData,
}) => {
  const [workEnvironment, setWorkEnvironment] = React.useState<WorkEnvironment>(
    item.workEnvironment
  );
  const [drive, setDrive] = React.useState<Drive>(item.drive);
  const token = useAuthStore((state) => state.token);
  const getProductTypes = () => api.getAllProductTypesRequest(token);
  const getConstructions = () => api.getAllConstructionsRequest(token);
  const getManufacturingStandart = () =>
    api.getAllManufacturingStandartsRequest(token);
  const getDiameters = () => api.getAllDiametersRequest(token);
  const getClassPressures = () => api.getAllClassPressuresRequest(token);
  const getTightnessClass = () => api.getAllTightnessClassRequest(token);
  const getTemperatureRanges = () => api.getAllTemperatureRangeRequest(token);
  const getMaterials = () => api.getAllMaterialsRequest(token);
  const getConnectionTypes = () => api.getAllConnectionTypesRequest(token);
  const [model, setModel] = useState(item.productType.model || "");

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
  const { data: productTypes = [], isLoading: isLoadingProductTypes } =
    useQuery<ProductType[]>({
      queryKey: ["product-types"],
      queryFn: getProductTypes,
    });
  const { data: constructions = [], isLoading: isLoadingConstructions } =
    useQuery<ConstructionType[]>({
      queryKey: ["constructions"],
      queryFn: getConstructions,
    });
  const {
    data: manufacturingStandart = [],
    isLoading: isLoadingManufacturingStandart,
  } = useQuery<ManufacturingStandartType[]>({
    queryKey: ["manufacturingStandart"],
    queryFn: getManufacturingStandart,
  });
  const { data: diameters = [], isLoading: isLoadingDiameter } = useQuery<
    DiameterType[]
  >({
    queryKey: ["diameters"],
    queryFn: getDiameters,
  });
  const { data: classPressures = [], isLoading: isLoadingClassPressures } =
    useQuery<ClassPressureType[]>({
      queryKey: ["classPressures"],
      queryFn: getClassPressures,
    });
  const { data: tightnessClasses = [], isLoading: isLoadingTightnessClass } =
    useQuery<TightnessClassType[]>({
      queryKey: ["tightnessClass"],
      queryFn: getTightnessClass,
    });
  const { data: temperatureRanges = [], isLoading: isLoadingTemperatureRange } =
    useQuery<TemperatureRangeType[]>({
      queryKey: ["temperatureRanges"],
      queryFn: getTemperatureRanges,
    });
  const { data: materials = [], isLoading: isLoadingMaterials } = useQuery<
    MaterialType[]
  >({
    queryKey: ["materials"],
    queryFn: getMaterials,
  });
  const { data: connectionTypes = [], isLoading: isLoadingConnectionType } =
    useQuery<ConnectionType[]>({
      queryKey: ["connectionTypes"],
      queryFn: getConnectionTypes,
    });
  const handleChangeProductType = (event: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      [item.id]: {
        ...prev[item.id],
        productTypeId: event.target.value,
      },
    }));
    const modelName = productTypes.find(
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
  const handleChangeHousingMaterial = handleChangeField("housingMaterialId");
  const handleChangeRodMaterial = handleChangeField("rodMaterialId");
  const handleChangeWedgeMaterial = handleChangeField("wedgeMaterialId");
  const handleChangeSeatMaterial = handleChangeField("seatMaterialId");
  const handleChangeCounterFlangesMaterial = handleChangeField(
    "counterFlangesMaterialId"
  );
  const handleChangeConnectionType = handleChangeField("connectionTypeId");
  const handleChangePipeMaterial = handleChangeField("pipeMaterialId");
  return (
    <>
      <span className="bg-green-300 rounded-xl mb-2 inline-block px-3">{`${
        currentTypes?.name
      } ${index + 1}`}</span>
      <div key={index} className="flex my-3">
        <TextField
          label="TAG номер"
          defaultValue={item.tagNumber}
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
        <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="demo-simple-select-label">
            {"Тип продукции"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            key={item?.productType?.id?.toString() || ""}
            defaultValue={item?.productType?.id?.toString() || ""}
            id="demo-simple-select"
            disabled={isLoadingProductTypes}
            label="Тип продукции"
            onChange={handleChangeProductType}
          >
            {productTypes.map((type, i) => (
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
            disabled={isLoadingConstructions}
            label="Конструкция"
            onChange={handleChangeConstructions}
          >
            {constructions.map((type, i) => (
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
            disabled={isLoadingManufacturingStandart}
            label="Стандарт изготовления"
            onChange={handleChangeManufacturingStandart}
          >
            {manufacturingStandart.map((type, i) => (
              <MenuItem key={i} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="demo-simple-select-label">{"Ду"}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={item?.diameter?.id?.toString()}
            disabled={isLoadingDiameter}
            label="Ду"
            onChange={handleChangeDiameter}
          >
            {diameters.map((type, i) => (
              <MenuItem key={i} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="demo-simple-select-label">{"Pу"}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={item?.classPressure?.id?.toString()}
            disabled={isLoadingClassPressures}
            label="Pу"
            onChange={handleChangeClassPressure}
          >
            {classPressures.map((type, i) => (
              <MenuItem key={i} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            disabled={isLoadingTightnessClass}
            label="Класс герметичности"
            onChange={handleChangeTightnessClass}
          >
            {tightnessClasses.map((type, i) => (
              <MenuItem key={i} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="temperature-range-select-label">
            {"Температурный диапазон"}
          </InputLabel>
          <Select
            labelId="temperature-range-select-label"
            id="temperature-range-select"
            defaultValue={item?.temperatureRange?.id?.toString()}
            disabled={isLoadingTemperatureRange}
            label="Температурный диапазон"
            onChange={handleChangeTemperatureRange}
          >
            {temperatureRanges.map((range, i) => (
              <MenuItem key={i} value={range.id}>
                {range.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="housing-material-select-label">
            {"Материал корпуса"}
          </InputLabel>
          <Select
            labelId="housing-material-select-label"
            id="housing-material-select"
            defaultValue={item?.housingMaterial?.id?.toString()}
            disabled={isLoadingMaterials}
            label="Материал корпуса"
            onChange={handleChangeHousingMaterial}
          >
            {materials.map((material, i) => (
              <MenuItem key={i} value={material.id}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="housing-material-select-label">
            {"Материал штока"}
          </InputLabel>
          <Select
            labelId="housing-material-select-label"
            id="housing-material-select"
            defaultValue={item?.rodMaterial?.id?.toString()}
            disabled={isLoadingMaterials}
            label="Материал штока"
            onChange={handleChangeRodMaterial}
          >
            {materials.map((material, i) => (
              <MenuItem key={i} value={material.id}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="wedge-material-select-label">
            {"Материал клина"}
          </InputLabel>
          <Select
            labelId="wedge-material-select-label"
            id="wedge-material-select"
            defaultValue={item?.wedgeMaterial?.id?.toString()}
            disabled={isLoadingMaterials}
            label="Материал клина"
            onChange={handleChangeWedgeMaterial}
          >
            {materials.map((material, i) => (
              <MenuItem key={i} value={material.id}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="seat-material-select-label">
            {"Материал седла"}
          </InputLabel>
          <Select
            labelId="seat-material-select-label"
            id="seat-material-select"
            defaultValue={item?.seatMaterial?.id?.toString()}
            disabled={isLoadingMaterials}
            label="Материал седла"
            onChange={handleChangeSeatMaterial}
          >
            {materials.map((material, i) => (
              <MenuItem key={i} value={material.id}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="connection-type-select-label">
            {"Тип соединения"}
          </InputLabel>
          <Select
            labelId="connection-type-select-label"
            id="connection-type-select"
            defaultValue={item?.connectionType?.id?.toString()}
            disabled={isLoadingConnectionType}
            label="Тип соединения"
            onChange={handleChangeConnectionType}
          >
            {connectionTypes.map((type, i) => (
              <MenuItem key={i} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="seat-material-select-label">
            {"Материал ответных фланцев"}
          </InputLabel>
          <Select
            labelId="seat-material-select-label"
            id="seat-material-select"
            value={item?.counterFlangesMaterial?.id?.toString()}
            disabled={isLoadingMaterials}
            label="Материал ответных фланцев"
            onChange={handleChangeCounterFlangesMaterial}
          >
            {materials.map((material, i) => (
              <MenuItem key={i} value={material.id}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <FormControl required className="!mr-3 !min-w-[220px]">
          <InputLabel id="pipe-material-select-label">
            {"Материал трубы"}
          </InputLabel>
          <Select
            labelId="pipe-material-select-label"
            id="pipe-material-select"
            value={item?.pipeMaterial?.id?.toString()}
            disabled={isLoadingMaterials}
            label="Материал трубы"
            onChange={handleChangePipeMaterial}
          >
            {materials.map((material, i) => (
              <MenuItem key={i} value={material.id}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
      </div>
    </>
  );
};
