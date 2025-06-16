import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import { Item, OptionsType, TypeZra } from "../../../../../shared/types";
import clsx from "clsx";
import { ZraDict } from "../../helpers";
import { useTranslations } from "next-intl";
import { WedgeGateParallelSliding } from "./components/WedgeGateParallelSliding";
import { BoltOnLid } from "./components/BoltOnLid";
import { Bellows } from "./components/Bellows";
import { PressureSealGate } from "./components/PressureSealGate";
import { HighPressureParallelSliding } from "./components/HighPressureParallelSliding";
import { SphericalPipelineGate } from "./components/SphericalPipelineGate";
import { BoltedCover } from "./components/BoltedCover";

type Props = {
  index: number;
  setFormData: React.Dispatch<React.SetStateAction<Record<number, Item>>>;
  options: OptionsType;
  formData: Item & { productTypeId?: number };
};
const CreateForm: React.FC<Props> = React.memo(
  ({ index, setFormData, formData, options }) => {
    const t = useTranslations("OrderDetail");

    const [typeZra, setTypeZra] = React.useState<TypeZra | "">("");
    const selectedZra = options.productTypes.find(
      (item) => item.id === formData?.productTypeId
    )?.name;

    const typeZraOptions = selectedZra ? ZraDict[selectedZra] : [];

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
    };
    const handleChangeConstructions = handleChangeField("constructionId");

    const handleChangeTypeZra = (event: SelectChangeEvent) => {
      setTypeZra(event.target.value as TypeZra);
      setFormData((prev) => ({
        ...prev,
        [index + 1]: {
          ...prev[index + 1],
          typeZra: event.target.value as TypeZra,
        },
      }));
    };

    const renderContent = () => {
      switch (typeZra) {
        case "BOLT_ON_LID":
          return (
            <BoltOnLid
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "WEDGE_GATE_PARALLEL_SLIDING":
          return (
            <WedgeGateParallelSliding
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "BELLOWS":
          return (
            <Bellows
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "PRESSURE_SEAL_GATE":
          return (
            <PressureSealGate
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "HIGH_PRESSURE_PARALLEL_SLIDING":
          return (
            <HighPressureParallelSliding
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "SPHERICAL_PIPELINE_GATE":
          return (
            <SphericalPipelineGate
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "BOLTED_COVER":
          return (
            <BoltedCover
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
      }
    };
    return (
      <div key={index} className="w-fit">
        {/* {currentTypes && (
          <span className="bg-green-300 rounded-xl mb-2 inline-block px-3 sticky left-0">{`${
            currentTypes?.name
          } ${index + 1}`}</span>
        )} */}
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
          <FormControl className="!mr-3 !w-[240px]">
            <InputLabel id="demo-simple-select-label">{"Тип ЗРА"}</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typeZra}
              label="Тип ЗРА"
              onChange={handleChangeTypeZra}
            >
              {typeZraOptions.map((item, i) => (
                <MenuItem key={i} value={item}>
                  {t(item)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {renderContent()}
        </div>
      </div>
    );
  }
);

CreateForm.displayName = "export default ";

export default CreateForm;
