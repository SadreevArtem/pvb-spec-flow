import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { EquipmentType, Item, ProductType } from "../../../../../shared/types";
import { api } from "../../../../../shared/api/api";
import { useAuthStore } from "../../../../../shared/stores/auth";
import { useQuery } from "@tanstack/react-query";

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
  const getProductTypes = () => api.getAllProductTypesRequest(token);
  const [model, setModel] = useState("");
  const { data: productTypes = [], isLoading: isLoadingProductTypes } =
    useQuery<ProductType[]>({
      queryKey: ["product-types"],
      queryFn: getProductTypes,
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

  return (
    <>
      {currentTypes && (
        <span className="">{`${currentTypes?.name} ${index + 1}`}</span>
      )}
      <div key={index} className="flex my-3">
        <TextField
          label={"TAG номер"}
          className="!mr-3"
          variant="outlined"
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
        <TextField
          label={"Номер по ТЗ"}
          variant="outlined"
          className="!mr-3"
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
        <FormControl required className="!mr-3 w-[220px]">
          <InputLabel id="demo-simple-select-label">
            {"Тип продукции"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData[index + 1]?.productType?.id?.toString()}
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
          className=""
          onChange={(e) => e.preventDefault()}
          value={model}
        />
      </div>
    </>
  );
};
