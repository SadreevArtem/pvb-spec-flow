import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Customer, Order, User } from "../../../shared/types";
import { useAuthStore } from "../../../shared/stores/auth";
import { Button } from "../Button";
import { appToast } from "../AppToast/components/lib/appToast";
import { api } from "../../../shared/api/api";
import { useTranslations } from "next-intl";
import { useJwtToken } from "../../../shared/hooks/useJwtToken";

type Props = {
  id: number;
};

type Inputs = Order & { customerId: number; ownerId: number };

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

  const getOrderById = () => api.getOrderByIdRequest(id, token);
  const getQueryKey = (id: number) => ["order"].concat(id.toString());

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: getQueryKey(id),
    queryFn: getOrderById,
    enabled: id !== 0,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const updateOrderFunc = (input: Order) =>
    api.updateOrderRequest(input, token);
  const createOrderFunc = (input: Order) =>
    api.createOrderRequest(input, token);
  const deleteFunc = () => api.deleteOrderRequest(id, token);

  const { mutate: mutation, isPending } = useMutation({
    mutationFn: isEdit ? updateOrderFunc : createOrderFunc,
    onSuccess: () => {
      appToast.success(isEdit ? t("updated") : t("added"));
      queryClient.invalidateQueries({ queryKey: ["order"] });
      router.back();
    },
    onError: () => {
      appToast.error(t("error"));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFunc,
    onSuccess: () => {
      appToast.success(t("deleted"));
      queryClient.invalidateQueries({ queryKey: ["order"] });
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation({ ...data });
  };

  useEffect(() => {
    if (!order) return;
    Object.keys(order).forEach((key) => {
      if (key in order) {
        setValue(key as keyof Inputs, order[key as keyof Order] as string);
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
  }, [order, setValue]);

  return (
    <>
      {!isLoading && (
        <section className="container px-40 rounded-lg pt-4 mt-[60px]">
          <div className="flex mt-8 justify-between gap-4">
            <h2 className="text-xl">{t("edit")}</h2>
            <Button
              onButtonClick={() => router.back()}
              title={t("back")}
            ></Button>
          </div>

          {
            <form
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
                  {t("customer")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={customer.toString()}
                  disabled={isLoadingCustomers}
                  label={t("customer")}
                  onChange={handleChangeCustomer}
                >
                  {customers.map((customer, i) => (
                    <MenuItem key={i} value={customer.id}>
                      {customer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {t("owner")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={owner.toString()}
                  disabled={isLoadingOwners}
                  label={t("owner")}
                  onChange={handleChangeOwner}
                >
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
        </section>
      )}
    </>
  );
};
