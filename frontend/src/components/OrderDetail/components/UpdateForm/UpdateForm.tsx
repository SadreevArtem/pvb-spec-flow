import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Item, OptionsType, TypeZra } from "../../../../../shared/types";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { ZraDict } from "../../helpers";
import { BoltOnLid } from "./components/BoltOnLid";
import { WedgeGateParallelSliding } from "./components/WedgeGateParallelSliding";
import { Bellows } from "./components/Bellows";
import { PressureSealGate } from "./components/PressureSealGate";
import { HighPressureParallelSliding } from "./components/HighPressureParallelSliding";
import { SphericalPipelineGate } from "./components/SphericalPipelineGate";
import { BoltedCover } from "./components/BoltedCover";
import { TypeY } from "./components/TypeY";
import { Angular } from "./components/Angular";
import { BelowsValve } from "./components/BelowsValve";
import { BelowsValveTypeY } from "./components/BelowsValveTypeY";
import { PressureSealGlobe } from "./components/PressureSealGlobe";
import { PressureSealGlobeTypeY } from "./components/PressureSealGlobeTypeY";
import { Turning } from "./components/Turning";
import { Piston } from "./components/Piston";
import { PistonTypeY } from "./components/PistonTypeY";
import { SwingCheckPressureSeal } from "./components/SwingCheckPressureSeal";
import { LiftCheckPressureSealStraight } from "./components/LiftCheckPressureSealStraight";
import { LiftCheckPressureSealTypeY } from "./components/LiftCheckPressureSealTypeY";
import { InclinedDisk } from "./components/InclinedDisk";
import { FloatingPlugSideEntry } from "./components/FloatingPlugSideEntry";
import { TrunnionBallSideEntry } from "./components/TrunnionBallSideEntry";
import { TrunnionBallTopEntry } from "./components/TrunnionBallTopEntry";
import { Monoblock } from "./components/Monoblock";
import { FloatingTwin } from "./components/FloatingTwin";
import { ThreeWay } from "./components/ThreeWay";
import { TwoCentered } from "./components/TwoCentered";

type Props = {
  index: number;
  item: Item;
  formData: Item & { productTypeId?: number };
  setFormData: React.Dispatch<React.SetStateAction<Record<number, Item>>>;
  options: OptionsType;
};

export const UpdateForm: React.FC<Props> = ({
  item,
  setFormData,
  formData,
  options,
}) => {
  const [typeZra, setTypeZra] = useState<TypeZra | "">(item.typeZra);
  const [productType, setProductType] = useState<string>(
    options.productTypes.find((itemS) => itemS.id === item?.productType.id)
      ?.name || ""
  );

  const typeZraOptions = productType !== "" ? ZraDict[productType] : [];

  const t = useTranslations("OrderDetail");
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
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      [item.id]: {
        ...prev[item.id],
        productTypeId: item.productType.id,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeConstructions = handleChangeField("constructionId");

  const handleChangeProductType = (event: SelectChangeEvent) => {
    setProductType(
      options.productTypes.find((itemS) => itemS.id === +event.target.value)
        ?.name || ""
    );
    setFormData((prev) => ({
      ...prev,
      [item.id]: {
        ...prev[item.id],
        productTypeId: event.target.value,
      },
    }));
  };

  const handleChangeTypeZra = (event: SelectChangeEvent) => {
    setTypeZra(event.target.value as TypeZra);
    setFormData((prev) => ({
      ...prev,
      [item.id]: {
        ...prev[item.id],
        typeZra: event.target.value as TypeZra,
      },
    }));
  };

  const renderContent = () => {
    switch (typeZra) {
      case "BOLT_ON_LID":
        return (
          <BoltOnLid
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "WEDGE_GATE_PARALLEL_SLIDING":
        return (
          <WedgeGateParallelSliding
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "BELLOWS":
        return (
          <Bellows
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "PRESSURE_SEAL_GATE":
        return (
          <PressureSealGate
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "HIGH_PRESSURE_PARALLEL_SLIDING":
        return (
          <HighPressureParallelSliding
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "SPHERICAL_PIPELINE_GATE":
        return (
          <SphericalPipelineGate
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "BOLTED_COVER":
        return (
          <BoltedCover
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "TYPE_Y":
        return (
          <TypeY
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "ANGULAR":
        return (
          <Angular
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "BELLOWS_VALVE":
        return (
          <BelowsValve
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "BELLOWS_TYPE_Y":
        return (
          <BelowsValveTypeY
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "PRESSURE_SEAL_GLOBE":
        return (
          <PressureSealGlobe
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "PRESSURE_SEAL_GLOBE_TYPE_Y":
        return (
          <PressureSealGlobeTypeY
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "TURNING":
        return (
          <Turning
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "PISTON":
        return (
          <Piston
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "PISTON_TYPE_Y":
        return (
          <PistonTypeY
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "SWING_CHECK_PRESSURE_SEAL":
        return (
          <SwingCheckPressureSeal
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "LIFT_CHECK_PRESSURE_SEAL_STRAIGHT":
        return (
          <LiftCheckPressureSealStraight
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "LIFT_CHECK_PRESSURE_SEAL_Y_PATTERN":
        return (
          <LiftCheckPressureSealTypeY
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "INCLINED_DISK":
        return (
          <InclinedDisk
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "FLOATING_PLUG_SIDE_ENTRY":
        return (
          <FloatingPlugSideEntry
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "TRUNNION_BALL_SIDE_ENTRY":
        return (
          <TrunnionBallSideEntry
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "TRUNNION_BALL_TOP_ENTRY":
        return (
          <TrunnionBallTopEntry
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "MONOBLOCK":
        return (
          <Monoblock
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "FLOATING_TWIN":
        return (
          <FloatingTwin
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "THREE_WAY":
        return (
          <ThreeWay
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
      case "TWO_CENTERED":
        return (
          <TwoCentered
            index={item.id}
            item={item}
            setFormData={setFormData}
            formData={formData}
            options={options}
          />
        );
    }
  };

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
        {/* <TextField
          label={"Модель"}
          variant="outlined"
          disabled
          className="!mr-3 !min-w-[220px]"
          onChange={(e) => e.preventDefault()}
          value={model}
        /> */}
        <FormControl className={clsx("!mr-3 !w-[240px]", {})}>
          <InputLabel id="demo-simple-select-label">{"Тип ЗРА"}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeZra}
            label="Тип ЗРА"
            defaultValue={item.typeZra}
            onChange={handleChangeTypeZra}
          >
            {typeZraOptions?.map((item, i) => (
              <MenuItem key={i} value={item}>
                {t(item)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {renderContent()}

        {/* <FormControl required className="!mr-3 !min-w-[220px]">
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
        </FormControl> */}
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
        {/* <FormControl className="!mr-3 !min-w-[220px]">
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
        </FormControl> */}
        {/* <TextField
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
        /> */}
        {/* <FormControl className="!mr-3 !min-w-[220px]">
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
        </FormControl> */}
        {/* <FormControl required className="!mr-3 !w-[220px]">
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
        </FormControl> */}
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
        {/* <TextField
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
        /> */}
        {/* <FormControlLabel
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
        /> */}
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
        {/* <TextField
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
        /> */}
        {/* <TextField
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
        /> */}
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
        {/* <FormControl className="!mr-3 !min-w-[220px]">
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
        </FormControl> */}
        {/* <TextField
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
        /> */}
        {/* <TextField
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
        /> */}
      </div>
    </div>
  );
};
