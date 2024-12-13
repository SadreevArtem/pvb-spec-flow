import React, { FC } from "react";
import { AutoSizer, List } from "react-virtualized";
import CreateForm from "../CreateForm/CreateForm";
import { EquipmentType, Item, OptionsType } from "../../../../../shared/types";

type Props = {
  count: number;
  currentTypes: EquipmentType | undefined;
  setFormData: React.Dispatch<React.SetStateAction<Record<number, Item>>>;
  options: OptionsType;
  isEdit: boolean;
  formData: Record<number, Item>;
};

const VirtualizedCreateItems: FC<Props> = ({
  count,
  currentTypes,
  setFormData,
  formData,
  options,
  isEdit,
}) => {
  const createItems = Array.from({ length: count }, (_, index) => ({
    index,
  }));

  return (
    <>
      {!isEdit && (
        <AutoSizer>
          {({ width, height }) => (
            <List
              height={height}
              width={width}
              rowCount={createItems.length}
              rowHeight={120}
              style={{ overflow: "auto" }}
              overscanRowCount={5} // Для предзагрузки строк
              rowRenderer={({ index, style }) => {
                const item = createItems[index];
                return (
                  <div key={item.index.toString()} style={style}>
                    <CreateForm
                      index={item.index}
                      currentTypes={currentTypes}
                      formData={formData[index + 1]}
                      setFormData={setFormData}
                      options={options || {}}
                    />
                  </div>
                );
              }}
            />
          )}
        </AutoSizer>
      )}
    </>
  );
};

export default VirtualizedCreateItems;
