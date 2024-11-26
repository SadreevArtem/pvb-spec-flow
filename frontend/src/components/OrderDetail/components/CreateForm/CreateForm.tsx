import { TextField } from "@mui/material";
import React from "react";
import { EquipmentType, Item } from "../../../../../shared/types";

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
          className=""
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
    </>
  );
};
