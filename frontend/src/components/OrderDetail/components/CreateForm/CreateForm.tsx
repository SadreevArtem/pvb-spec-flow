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
import { ThreeCentered } from "./components/ThreeCentered";

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
        case "TYPE_Y":
          return (
            <TypeY
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );

        case "ANGULAR":
          return (
            <Angular
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "BELLOWS_VALVE":
          return (
            <BelowsValve
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );

        case "BELLOWS_TYPE_Y":
          return (
            <BelowsValveTypeY
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "PRESSURE_SEAL_GLOBE":
          return (
            <PressureSealGlobe
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );

        case "PRESSURE_SEAL_GLOBE_TYPE_Y":
          return (
            <PressureSealGlobeTypeY
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "TURNING":
          return (
            <Turning
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "PISTON":
          return (
            <Piston
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "PISTON_TYPE_Y":
          return (
            <PistonTypeY
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "SWING_CHECK_PRESSURE_SEAL":
          return (
            <SwingCheckPressureSeal
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );

        case "LIFT_CHECK_PRESSURE_SEAL_STRAIGHT":
          return (
            <LiftCheckPressureSealStraight
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "LIFT_CHECK_PRESSURE_SEAL_Y_PATTERN":
          return (
            <LiftCheckPressureSealTypeY
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );

        case "INCLINED_DISK":
          return (
            <InclinedDisk
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "FLOATING_PLUG_SIDE_ENTRY":
          return (
            <FloatingPlugSideEntry
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "TRUNNION_BALL_SIDE_ENTRY":
          return (
            <TrunnionBallSideEntry
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "TRUNNION_BALL_TOP_ENTRY":
          return (
            <TrunnionBallTopEntry
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "MONOBLOCK":
          return (
            <Monoblock
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );

        case "FLOATING_TWIN":
          return (
            <FloatingTwin
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "THREE_WAY":
          return (
            <ThreeWay
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );
        case "TWO_CENTERED":
          return (
            <TwoCentered
              index={index}
              setFormData={setFormData}
              formData={formData}
              options={options}
            />
          );

        case "THREE_CENTERED":
          return (
            <ThreeCentered
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
            label={t("tag_number")}
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
            label={t("tech_task_number")}
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
              {t("construction")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"0"}
              label={t("construction")}
              onChange={handleChangeConstructions}
            >
              <MenuItem value="0">{t("not_selected")}</MenuItem>
              {options.constructions.map((type, i) => (
                <MenuItem key={i} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required className="!mr-3 !w-[240px]">
            <InputLabel id="demo-simple-select-label">
              {t("product_type")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={"0"}
              label={t("product_type")}
              onChange={handleChangeProductType}
            >
              <MenuItem value="0">{t("not_selected")}</MenuItem>
              {options.productTypes.map((type, i) => (
                <MenuItem key={i} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="!mr-3 !w-[240px]">
            <InputLabel id="demo-simple-select-label">
              {t("type_zra")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={typeZra}
              label={t("type_zra")}
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
