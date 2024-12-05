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
import { api } from "../../../../../shared/api/api";
import { useAuthStore } from "../../../../../shared/stores/auth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/Button";
import clsx from "clsx";

type Props = {
  index: number;
  currentTypes: EquipmentType | undefined;
  setFormData: React.Dispatch<React.SetStateAction<Record<number, Item>>>;
  formData: Record<number, Item>;
};

export const CreateForm: React.FC<Props> = ({
  index,
  currentTypes,
  setFormData,
  formData,
}) => {
  const token = useAuthStore((state) => state.token);
  const [workEnvironment, setWorkEnvironment] = React.useState<
    WorkEnvironment | ""
  >("");
  const [drive, setDrive] = React.useState<Drive | "manual">("manual");
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
  const [model, setModel] = useState("");
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
      [index + 1]: {
        ...prev[index + 1],
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
      {currentTypes && (
        <span className="">{`${currentTypes?.name} ${index + 1}`}</span>
      )}
      <div key={index} className="flex my-3">
        <TextField
          label={"TAG номер"}
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
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
          value={formData[index + 1]?.tagNumber || ""}
        />
        <div>
          <Button
            title="fill add"
            className={clsx("mb-3", { hidden: index !== 0 })}
            onButtonClick={() => {
              const fillValue = formData[index + 1]?.techTaskNumber || ""; // Берем значение из текущего поля
              setFormData((prev) => {
                const updatedFormData: typeof formData = {};
                Object.keys(prev).forEach((key) => {
                  updatedFormData[+key] = {
                    ...prev[+key],
                    techTaskNumber: fillValue, // Присваиваем значение всем объектам
                  };
                });
                return updatedFormData;
              });
            }}
          />
          <TextField
            label={"Номер по ТЗ"}
            variant="outlined"
            defaultValue={formData[index + 1]?.techTaskNumber || ""}
            className={clsx("!mr-3 !min-w-[220px]")}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [index + 1]: {
                  ...prev[index + 1],
                  techTaskNumber: e.target.value,
                },
              }))
            }
            value={formData[index + 1]?.techTaskNumber || ""}
          />
        </div>
        <FormControl
          required
          className={clsx("!mr-3 !min-w-[220px]", {
            "!mt-[52px]": index == 0,
          })}
        >
          <InputLabel id="demo-simple-select-label">
            {"Тип продукции"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData[index + 1]?.productType?.id?.toString() || "1"}
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
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
          onChange={(e) => e.preventDefault()}
          value={model}
        />
        <FormControl
          required
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
        >
          <InputLabel id="demo-simple-select-label">{"Конструкция"}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData[index + 1]?.construction?.id?.toString() || "1"}
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
        <FormControl
          required
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
        >
          <InputLabel id="demo-simple-select-label">
            {"Стандарт изготовления"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={
              formData[index + 1]?.manufacturingStandart?.id?.toString() || "1"
            }
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
        <FormControl
          required
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
        >
          <InputLabel id="demo-simple-select-label">{"Ду"}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData[index + 1]?.diameter?.id?.toString() || "1"}
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
        <FormControl
          required
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
        >
          <InputLabel id="demo-simple-select-label">{"Pу"}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData[index + 1]?.classPressure?.id?.toString() || "1"}
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
        <FormControl
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
        >
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
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [index + 1]: {
                ...prev[index + 1],
                temperature: e.target.value,
              },
            }))
          }
          value={formData[index + 1]?.temperature || ""}
        />
        <FormControl
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
        >
          <InputLabel id="demo-simple-select-label">
            {"Класс герметичности"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData[index + 1]?.tightnessClass?.id?.toString() || "1"}
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
        <FormControl
          required
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
        >
          <InputLabel id="temperature-range-select-label">
            {"Температурный диапазон"}
          </InputLabel>
          <Select
            labelId="temperature-range-select-label"
            id="temperature-range-select"
            value={formData[index + 1]?.temperatureRange?.id?.toString() || "1"}
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
        <FormControl
          required
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
        >
          <InputLabel id="housing-material-select-label">
            {"Материал корпуса"}
          </InputLabel>
          <Select
            labelId="housing-material-select-label"
            id="housing-material-select"
            value={formData[index + 1]?.housingMaterial?.id?.toString() || "1"}
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
        <FormControl
          required
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
        >
          <InputLabel id="housing-material-select-label">
            {"Материал штока"}
          </InputLabel>
          <Select
            labelId="housing-material-select-label"
            id="housing-material-select"
            value={formData[index + 1]?.rodMaterial?.id?.toString() || "1"}
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
        <FormControl
          required
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
        >
          <InputLabel id="wedge-material-select-label">
            {"Материал клина"}
          </InputLabel>
          <Select
            labelId="wedge-material-select-label"
            id="wedge-material-select"
            value={formData[index + 1]?.wedgeMaterial?.id?.toString() || "1"}
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
        <FormControl
          required
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
        >
          <InputLabel id="seat-material-select-label">
            {"Материал седла"}
          </InputLabel>
          <Select
            labelId="seat-material-select-label"
            id="seat-material-select"
            value={formData[index + 1]?.seatMaterial?.id?.toString() || "1"}
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
        <FormControl
          required
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
        >
          <InputLabel id="connection-type-select-label">
            {"Тип соединения"}
          </InputLabel>
          <Select
            labelId="connection-type-select-label"
            id="connection-type-select"
            value={formData[index + 1]?.connectionType?.id?.toString() || "1"}
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
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [index + 1]: {
                ...prev[index + 1],
                constructionLength: e.target.value,
              },
            }))
          }
          value={formData[index + 1]?.constructionLength || ""}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData[index + 1]?.nace || false}
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
              checked={formData[index + 1]?.counterFlanges || false}
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
        <FormControl
          required
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
        >
          <InputLabel id="seat-material-select-label">
            {"Материал ответных фланцев"}
          </InputLabel>
          <Select
            labelId="seat-material-select-label"
            id="seat-material-select"
            value={
              formData[index + 1]?.counterFlangesMaterial?.id?.toString() || "1"
            }
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
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [index + 1]: {
                ...prev[index + 1],
                hairpins: e.target.value,
              },
            }))
          }
          value={formData[index + 1]?.hairpins || ""}
        />
        <TextField
          label="Гайки"
          variant="outlined"
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [index + 1]: {
                ...prev[index + 1],
                nuts: e.target.value,
              },
            }))
          }
          value={formData[index + 1]?.nuts || ""}
        />
        <TextField
          label="Размер трубы"
          variant="outlined"
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [index + 1]: {
                ...prev[index + 1],
                pipeSize: e.target.value,
              },
            }))
          }
          value={formData[index + 1]?.pipeSize || ""}
        />
        <FormControl
          required
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
        >
          <InputLabel id="pipe-material-select-label">
            {"Материал трубы"}
          </InputLabel>
          <Select
            labelId="pipe-material-select-label"
            id="pipe-material-select"
            value={formData[index + 1]?.pipeMaterial?.id?.toString() || "1"}
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
        <FormControl
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
        >
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
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [index + 1]: {
                ...prev[index + 1],
                driveKit: e.target.value,
              },
            }))
          }
          value={formData[index + 1]?.driveKit || ""}
        />
        <TextField
          label="Примечание"
          variant="outlined"
          className={clsx("!mr-3 !min-w-[220px]", { "!mt-[52px]": index == 0 })}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [index + 1]: {
                ...prev[index + 1],
                comment: e.target.value,
              },
            }))
          }
          value={formData[index + 1]?.comment || ""}
        />
      </div>
    </>
  );
};
