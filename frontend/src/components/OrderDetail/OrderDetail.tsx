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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  Customer,
  Item,
  Order,
  User,
  ConnectionType,
  ConstructionType,
  ManufacturingStandartType,
  MaterialType,
  ProductType,
  TemperatureRangeType,
  TightnessClassType,
} from "../../../shared/types";
import { useAuthStore } from "../../../shared/stores/auth";
import { Button } from "../Button";
import { appToast } from "../AppToast/components/lib/appToast";
import { api } from "../../../shared/api/api";
import { useTranslations } from "next-intl";
import { useJwtToken } from "../../../shared/hooks/useJwtToken";
import { UpdateForm } from "./components/UpdateForm/UpdateForm";
import VirtualizedCreateItems from "./components/VirtualizedCreateItems/VirtualizedCreateItems";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type Props = {
  id: number;
};

type Inputs = Order & {
  customerId: number;
  ownerId: number;
  equipmentTypeId: number;
};
type InputItem = Item & { orderId: number };

export const OrderDetail: React.FC<Props> = ({ id }) => {
  const isEdit = id !== 0;
  const token = useAuthStore((state) => state.token);
  const t = useTranslations("OrderDetail");
  const queryClient = useQueryClient();
  const [customer, setCustomer] = React.useState<number>(0);
  const [owner, setOwner] = React.useState<number>(0);
  const router = useRouter();
  const { sub } = useJwtToken();
  const isAdmin = Number(sub) === 1;

  const getProductTypes = () => api.getAllProductTypesRequest(token);
  const getConstructions = () => api.getAllConstructionsRequest(token);
  const getManufacturingStandart = () =>
    api.getAllManufacturingStandartsRequest(token);
  const getTightnessClass = () => api.getAllTightnessClassRequest(token);
  const getTemperatureRanges = () => api.getAllTemperatureRangeRequest(token);
  const getMaterials = () => api.getAllMaterialsRequest(token);
  const getConnectionTypes = () => api.getAllConnectionTypesRequest(token);

  const getCustomers = () => api.getAllCustomersRequest(token);
  const { data: customers = [], isLoading: isLoadingCustomers } = useQuery<
    Customer[]
  >({ queryKey: ["customer"], queryFn: getCustomers });

  const getUsers = () => api.getAllUsersRequest(token);
  const { data: owners = [], isLoading: isLoadingOwners } = useQuery<User[]>({
    queryKey: ["user"],
    queryFn: getUsers,
    enabled: isAdmin,
  });

  const { data: productTypes = [] } = useQuery<ProductType[]>({
    queryKey: ["product-types"],
    queryFn: getProductTypes,
  });
  const { data: constructions = [] } = useQuery<ConstructionType[]>({
    queryKey: ["constructions"],
    queryFn: getConstructions,
  });
  const { data: manufacturingStandart = [] } = useQuery<
    ManufacturingStandartType[]
  >({
    queryKey: ["manufacturingStandart"],
    queryFn: getManufacturingStandart,
  });
  const { data: tightnessClasses = [] } = useQuery<TightnessClassType[]>({
    queryKey: ["tightnessClass"],
    queryFn: getTightnessClass,
  });
  const { data: temperatureRanges = [] } = useQuery<TemperatureRangeType[]>({
    queryKey: ["temperatureRanges"],
    queryFn: getTemperatureRanges,
  });
  const { data: materials = [] } = useQuery<MaterialType[]>({
    queryKey: ["materials"],
    queryFn: getMaterials,
  });
  const { data: connectionTypes = [] } = useQuery<ConnectionType[]>({
    queryKey: ["connectionTypes"],
    queryFn: getConnectionTypes,
  });

  const getOrderById = () => api.getOrderByIdRequest(id, token);
  const getQueryKey = (id: number) => ["order"].concat(id.toString());

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: getQueryKey(id),
    queryFn: getOrderById,
    enabled: id !== 0,
  });
  const [formData, setFormData] = React.useState<Record<number, Item>>({});
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      documentationSheet: order?.documentationSheet,
    },
  });

  const updateOrderFunc = (input: Inputs) =>
    api.updateOrderRequest(input, token);
  const createOrderFunc = (input: Inputs) =>
    api.createOrderRequest(input, token);
  const deleteFunc = () => api.deleteOrderRequest(id, token);

  const updateItemFunc = (input: InputItem) =>
    api.updateItemRequest(input, token);
  const createItemFunc = (input: InputItem) =>
    api.createItemRequest(input, token);

  const { mutateAsync: mutation, isPending } = useMutation({
    mutationFn: isEdit ? updateOrderFunc : createOrderFunc,
    onSuccess: () => {
      appToast.success(isEdit ? t("updated") : t("added"));
      queryClient.invalidateQueries({ queryKey: getQueryKey(id) });
    },
    onError: () => {
      appToast.error(t("error"));
    },
  });
  const { mutateAsync: mutationItem } = useMutation({
    mutationFn: isEdit ? updateItemFunc : createItemFunc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getQueryKey(id) });
    },
    onError: () => {
      appToast.error(t("error"));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFunc,
    onSuccess: () => {
      appToast.success("deleted");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      router.back();
    },
    onError: () => {
      appToast.error(t("error"));
    },
  });

  const generateMutation = useMutation({
    mutationFn: () => api.generateExcelFile(id, token),
    onSuccess: () => {
      appToast.success("generate");
      queryClient.invalidateQueries({ queryKey: getQueryKey(id) });
    },
    onError: () => {
      appToast.error(t("error"));
    },
  });

  const handleChangeCustomer = (event: SelectChangeEvent) => {
    setCustomer(+event.target.value as number);
    setValue("customerId", +event.target.value as number);
  };

  const handleChangeOwner = (event: SelectChangeEvent) => {
    setOwner(+event.target.value as number);
    setValue("ownerId", +event.target.value as number);
  };

  const onDeleteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    deleteMutation.mutate();
  };

  const onGenerateClick = (event: React.MouseEvent) => {
    event.preventDefault();
    generateMutation.mutate();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (Object.keys(formData).length < 1) {
      appToast.error("Заполните поля продукции");
      return;
    }
    mutation({
      ...data,
      ...(Boolean(order?.owner.id) && { ownerId: order?.owner.id }),
    }).then(async (data) => {
      // await Promise.all(
      //   Array.from(Object.values(formData), (item) =>
      //     mutationItem({
      //       ...item,
      //       ...(isEdit ? { orderId: id } : { orderId: data.id }),
      //     })
      //   )
      // );
      await Object.values(formData).reduce(async (prevPromise, item) => {
        await prevPromise; // Дожидаемся завершения предыдущего
        return mutationItem({
          ...item,
          ...(isEdit ? { orderId: id } : { orderId: data.id }),
        });
      }, Promise.resolve());
      router.back();
    });
  };

  useEffect(() => {
    if (!order) return;
    Object.keys(order).forEach((key) => {
      if (key in order) {
        setValue(key as keyof Inputs, order[key as keyof Order]);
      }
    });
    if (order.customer) {
      setCustomer(order.customer.id);
      setValue("customerId", order.customer.id);
    }

    if (order.owner) {
      setOwner(order.owner.id);
      setValue("ownerId", order.owner.id);
    }
    if (order.items) {
      setFormData(
        order.items.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {} as Record<number, (typeof order.items)[number]>)
      );
    }
  }, [order, setValue]);

  const options = useMemo(() => {
    return {
      productTypes,
      constructions,
      manufacturingStandart,
      tightnessClasses,
      temperatureRanges,
      materials,
      connectionTypes,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    productTypes,
    constructions,
    manufacturingStandart,
    tightnessClasses,
    temperatureRanges,
    materials,
    connectionTypes,
  ]);

  return (
    <>
      {!isLoading && (
        <section className="container px-40 rounded-lg pt-4 mt-[60px]">
          <div className="flex mt-8 justify-between gap-4">
            <h2 className="text-xl">{t(isEdit ? "edit" : "add")}</h2>
            <Button
              onButtonClick={() => router.back()}
              title={t("back")}
            ></Button>
          </div>

          {
            <div className="flex justify-between">
              <form
                id="createItemForm"
                name="createItemForm"
                onSubmit={handleSubmit(onSubmit)}
                className="md:w-[50%] py-4 flex flex-col md:gap-6 gap-4"
              >
                <TextField
                  variant="outlined"
                  label={t("contractNumber")}
                  {...register("contractNumber", { required: true })}
                />
                {errors.contractNumber && (
                  <span className="text-red">{t("required")}</span>
                )}

                <TextField
                  variant="outlined"
                  label={t("complectName")}
                  {...register("complectName", { required: true })}
                />
                {errors.complectName && (
                  <span className="text-red">{t("required")}</span>
                )}
                <TextField
                  variant="outlined"
                  required
                  defaultValue={order?.count}
                  disabled={isEdit}
                  label={t("count")}
                  type="number"
                  onChange={(event) => {
                    setValue("count", +event.target.value);
                  }}
                  // {...register("count", { required: true })}
                />
                {errors.count && (
                  <span className="text-red">{t("required")}</span>
                )}
                <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">
                    {t("customerName")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={(customer ?? 0).toString()}
                    disabled={isLoadingCustomers}
                    label={t("customerName")}
                    onChange={handleChangeCustomer}
                  >
                    <MenuItem value="0">{"Не выбрано"}</MenuItem>
                    {customers.map((customer, i) => (
                      <MenuItem key={i} value={customer.id}>
                        {customer.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* <FormControl fullWidth required>
                  <InputLabel id="demo-simple-select-label">
                    {t("equipmentType")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={(equipmentType ?? 0).toString()}
                    disabled={isLoadingEquipmentType}
                    label={t("equipmentType")}
                    onChange={handleChangeEquipmentType}
                  >
                    <MenuItem value="0">{"Не выбрано"}</MenuItem>
                    {equipmentTypes.map((type, i) => (
                      <MenuItem key={i} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
                <FormControl
                  fullWidth
                  className={clsx({ "!hidden": !isAdmin })}
                >
                  <InputLabel id="demo-simple-select-label">
                    {t("owner")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={(owner ?? 0).toString()}
                    disabled={isLoadingOwners}
                    label={t("owner")}
                    onChange={handleChangeOwner}
                  >
                    <MenuItem value="0">{"Не выбрано"}</MenuItem>
                    {owners.map((owner, i) => (
                      <MenuItem key={i} value={owner.id}>
                        {owner.about}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <div className="flex gap-4">
                  <Button
                    disabled={isPending}
                    title={t("save")}
                    type="submit"
                  />

                  {isAdmin && (
                    <Button
                      title={t("delete")}
                      onButtonClick={onDeleteClick}
                      type="button"
                    />
                  )}
                  <Button title="export" onButtonClick={onGenerateClick} />
                </div>
                <div className="flex flex-col">
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={order?.documentationSheet || false}
                        onChange={(e) =>
                          setValue("documentationSheet", e.target.checked)
                        }
                      />
                    }
                    label="Лист документации"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={order?.installationDrawings || false}
                        onChange={(e) =>
                          setValue("installationDrawings", e.target.checked)
                        }
                      />
                    }
                    label="Монтажные чертежи"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={order?.assemblyDrawing || false}
                        onChange={(e) =>
                          setValue("assemblyDrawing", e.target.checked)
                        }
                      />
                    }
                    label="Сборочный чертеж"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={order?.agreementProtocol || false}
                        onChange={(e) =>
                          setValue("agreementProtocol", e.target.checked)
                        }
                      />
                    }
                    label="Протокол согласования"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={
                          order?.installationInstructions || false
                        }
                        onChange={(e) =>
                          setValue("installationInstructions", e.target.checked)
                        }
                      />
                    }
                    label="Инструкции по монтажу"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={order?.qualityPlan || false}
                        onChange={(e) =>
                          setValue("qualityPlan", e.target.checked)
                        }
                      />
                    }
                    label="План качества"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={order?.materialsCertificate || false}
                        onChange={(e) =>
                          setValue("materialsCertificate", e.target.checked)
                        }
                      />
                    }
                    label="Сертификат на материалы"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={order?.declarationOfTRTC || false}
                        onChange={(e) =>
                          setValue("declarationOfTRTC", e.target.checked)
                        }
                      />
                    }
                    label="Декларация ТР ТС"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={
                          order?.presenceOfCustomerDuringTesting || false
                        }
                        onChange={(e) =>
                          setValue(
                            "presenceOfCustomerDuringTesting",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Плата за присутствие заказчика во время испытаний"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={
                          order?.gasInspectionHighPressure || false
                        }
                        onChange={(e) =>
                          setValue(
                            "gasInspectionHighPressure",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Испытание газом высокого давления"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        defaultChecked={order?.thirdSideInspection || false}
                        onChange={(e) =>
                          setValue("thirdSideInspection", e.target.checked)
                        }
                      />
                    }
                    label="Инспекция третьей стороны"
                  />
                </div>
              </form>
              <div className="flex w-full mt-8">
                {order?.filePath && (
                  <div className="flex w-full justify-center">
                    <div className="relative lg:h-[64px] h-[88px] lg:max-w-[64px] bg-gray-purple z-0 rounded-4 max-md:mx-auto w-full">
                      <Link target="blanc" href={order?.filePath || ""}>
                        <Image
                          src={`/files-images/${"xls"}.svg`}
                          width={100}
                          height={100}
                          alt="изображение"
                          className="absolute left-0 right-0 top-0 bottom-0 m-auto max-md:w-[56px]"
                        />
                      </Link>
                    </div>
                  </div>
                )}
                {order?.filePathPdf && (
                  <div className="flex w-full justify-center">
                    <div className="relative lg:h-[64px] h-[88px] lg:max-w-[64px] bg-gray-purple z-0 rounded-4 max-md:mx-auto w-full">
                      <Link target="blanc" href={order?.filePathPdf || ""}>
                        <Image
                          src={`/files-images/${"pdf"}.svg`}
                          width={100}
                          height={100}
                          alt="изображение"
                          className="absolute left-0 right-0 top-0 bottom-0 m-auto max-md:w-[56px]"
                        />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
          <div style={{ width: "fit", height: "600px" }} className="">
            <VirtualizedCreateItems
              count={watch("count")}
              setFormData={setFormData}
              isEdit={isEdit}
              formData={formData}
              options={options}
            />
            {/* {!isEdit && (
              <Autosizer>
                {({ width, height }) => (
                  <List
                    height={height}
                    width={width}
                    itemCount={createItems.length}
                    itemSize={120}
                  >
                    {({ index, style }) => (
                      <div key={index} style={style}>
                        {createItems[index]}
                      </div>
                    )}
                  </List>
                )}
              </Autosizer>
            )} */}
            {isEdit &&
              Object.values(formData)
                .sort((a, b) => a.id - b.id)
                .map((item, index) => (
                  <UpdateForm
                    key={index}
                    item={item}
                    index={index}
                    setFormData={setFormData}
                    options={options}
                  />
                ))}
          </div>

          <div className="h-[32px]"></div>
        </section>
      )}
    </>
  );
};
