import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  ConstructionType,
  EquipmentType,
  Item,
  ProductType,
} from "../../../../../shared/types";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../../../shared/stores/auth";
import { api } from "../../../../../shared/api/api";
import { useState } from "react";

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
  const token = useAuthStore((state) => state.token);
  const getProductTypes = () => api.getAllProductTypesRequest(token);
  const getConstructions = () => api.getAllConstructionsRequest(token);
  const [model, setModel] = useState(item.productType.model || "");
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
  const handleChangeConstructions = (event: SelectChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      [item.id]: {
        ...prev[item.id],
        constructionId: event.target.value,
      },
    }));
  };
  return (
    <>
      <span className="bg-green-300 rounded-xl mb-2 inline-block px-3">{`${
        currentTypes?.name
      } ${index + 1}`}</span>
      <div key={index} className="flex my-3">
        <TextField
          label="TAG номер"
          defaultValue={item.tagNumber}
          className="!mr-3"
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
          className="!mr-3"
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
        <FormControl required className="!mr-3 w-[220px]">
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
          className="!mr-3"
          onChange={(e) => e.preventDefault()}
          value={model}
        />
        <FormControl required className="!mr-3 w-[220px]">
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
      </div>
    </>
  );
};
