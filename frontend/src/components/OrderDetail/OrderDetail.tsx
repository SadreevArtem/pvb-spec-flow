import {
  FormControl,
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
  EquipmentType,
  Item,
  Order,
  User,
  ClassPressureType,
  ConnectionType,
  ConstructionType,
  DiameterType,
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
  const [equipmentType, setEquipmentType] = React.useState<number>(0);
  const router = useRouter();
  const { sub } = useJwtToken();
  const isAdmin = Number(sub) === 1;

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
  const getEquipmentType = () => api.getAllEquipmentTypesRequest(token);
  const { data: equipmentTypes = [], isLoading: isLoadingEquipmentType } =
    useQuery<EquipmentType[]>({
      queryKey: ["equipment-type"],
      queryFn: getEquipmentType,
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
  const { data: diameters = [] } = useQuery<DiameterType[]>({
    queryKey: ["diameters"],
    queryFn: getDiameters,
  });
  const { data: classPressures = [] } = useQuery<ClassPressureType[]>({
    queryKey: ["classPressures"],
    queryFn: getClassPressures,
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
  } = useForm<Inputs>();

  const updateOrderFunc = (input: Order) =>
    api.updateOrderRequest(input, token);
  const createOrderFunc = (input: Order) =>
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
  const handleChangeEquipmentType = (event: SelectChangeEvent) => {
    setEquipmentType(+event.target.value as number);
    setValue("equipmentTypeId", +event.target.value as number);
  };
  const currentTypes = equipmentTypes.find((item) => item.id === equipmentType);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (Object.keys(formData).length < 1) {
      appToast.error("Заполните поля продукции");
      return;
    }
    mutation({
      ...data,
    }).then(async (data) => {
      await Promise.all(
        Array.from(Object.values(formData), (item) =>
          mutationItem({
            ...item,
            ...(isEdit ? { orderId: id } : { orderId: data.id }),
          })
        )
      );
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
    if (order.equipmentType) {
      setEquipmentType(order.equipmentType.id);
      setValue("equipmentTypeId", order.equipmentType.id);
    }
  }, [order, setValue]);

  const options = useMemo(() => {
    return {
      productTypes,
      constructions,
      manufacturingStandart,
      diameters,
      classPressures,
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
    diameters,
    classPressures,
    tightnessClasses,
    temperatureRanges,
    materials,
    connectionTypes,
  ]);
  console.log(formData);

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
              <FormControl fullWidth required>
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
              </FormControl>
              <FormControl fullWidth className={clsx({ "!hidden": !isAdmin })}>
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
                <Button disabled={isPending} title={t("save")} type="submit" />

                {isAdmin && (
                  <Button
                    title={t("delete")}
                    onButtonClick={onDeleteClick}
                    type="button"
                  />
                )}
              </div>
            </form>
          }
          <div style={{ width: "fit", height: "600px" }} className="">
            <VirtualizedCreateItems
              count={watch("count")}
              currentTypes={currentTypes}
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
              Object.values(formData).map((item, index) => (
                <UpdateForm
                  key={index}
                  item={item}
                  index={index}
                  setFormData={setFormData}
                  currentTypes={currentTypes}
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
