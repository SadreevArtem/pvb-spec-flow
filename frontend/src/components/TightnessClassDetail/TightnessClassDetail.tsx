import { TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { TightnessClassType } from "../../../shared/types";
import { useAuthStore } from "../../../shared/stores/auth";
import { Button } from "../Button";
import { appToast } from "../AppToast/components/lib/appToast";
import { api } from "../../../shared/api/api";
import { useTranslations } from "next-intl";

type Props = {
  id: number;
};

type Inputs = TightnessClassType;

export const TightnessClassDetail: React.FC<Props> = ({ id }) => {
  const isEdit = id !== 0;
  const token = useAuthStore((state) => state.token);
  const t = useTranslations("DirectoryDetail");
  const queryClient = useQueryClient();

  const getTightnessClassById = () =>
    api.getTightnessClassByIdRequest(id, token);
  const getQueryKey = (id: number) => ["tightnessClasss"].concat(id.toString());
  const router = useRouter();

  const { data: tightnessClass, isLoading } = useQuery<TightnessClassType>({
    queryKey: getQueryKey(id),
    queryFn: getTightnessClassById,
    enabled: id !== 0,
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const updateTightnessClassFunc = (input: Inputs) =>
    api.updateTightnessClassRequest(input, token);
  const createTightnessClassFunc = (input: Inputs) =>
    api.createTightnessClassRequest(input, token);
  const deleteFunc = () => api.deleteTightnessClassRequest(id, token);

  const { mutate: mutation, isPending } = useMutation({
    mutationFn: isEdit ? updateTightnessClassFunc : createTightnessClassFunc,
    onSuccess: () => {
      appToast.success(isEdit ? "Успешно изменено" : "Успешно добавлено");
      queryClient.invalidateQueries({
        queryKey: ["tightnessClasss"],
      });
      router.back();
    },
    onError: () => {
      appToast.error("Произошла ошибка");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFunc,
    onSuccess: () => {
      appToast.success("Успешно удалено");
      queryClient.invalidateQueries({ queryKey: ["tightnessClasss"] });
      router.back();
    },
    onError: () => {
      appToast.error("Произошла ошибка");
    },
  });
  const onDeleteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    deleteMutation.mutate();
  };
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation({
      ...data,
    });
  };

  useEffect(() => {
    if (!tightnessClass) return;
    Object.keys(tightnessClass).forEach((key) => {
      if (key in tightnessClass) {
        setValue(
          key as keyof TightnessClassType,
          tightnessClass[key as keyof TightnessClassType] as string
        );
      }
    });
  }, [tightnessClass, setValue]);

  return (
    <>
      {!isLoading && (
        <section className="container px-40 rounded-lg pt-4 mt-[60px]">
          <div className="flex mt-8 justify-between gap-4">
            <h2 className="text-xl">{isEdit ? t("edit") : t("add")}</h2>
            <Button
              onButtonClick={() => router.back()}
              title={t("back")}
            ></Button>
          </div>
          <div className="flex justify-between gap-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="md:w-[50%] py-4 flex flex-col md:gap-6 gap-4"
            >
              <TextField
                variant="outlined"
                label={t("username")}
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500">{t("required")}</span>
              )}

              <div className="flex gap-4">
                <Button disabled={isPending} title={t("save")} type="submit" />

                {id !== 0 && (
                  <Button
                    title={t("delete")}
                    onButtonClick={onDeleteClick}
                    type="button"
                  />
                )}
              </div>
            </form>
            <div className="flex w-full flex-col"></div>
          </div>
        </section>
      )}
    </>
  );
};
