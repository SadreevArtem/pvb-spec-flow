import { TextField } from "@mui/material";
import { EquipmentType, Item } from "../../../../../shared/types";

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
  return (
    <>
      <span className="">{`${currentTypes?.name} ${index + 1}`}</span>
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
          className=""
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
      </div>
    </>
  );
};
