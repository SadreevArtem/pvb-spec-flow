import React from "react";
import { useAuthStore } from "../../../shared/stores/auth";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/api/api";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import { Button } from "../Button";
import { useTranslations } from "next-intl";
import { ProductType } from "../../../shared/types";

export const ProductTypeComponent = () => {
  const token = useAuthStore((state) => state.token);
  const getProductTypes = () => api.getAllProductTypesRequest(token);
  const { data: productTypes = [], isLoading } = useQuery<ProductType[]>({
    queryKey: ["product-types"],
    queryFn: getProductTypes,
  });
  const t = useTranslations();
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="flex mb-2">
            <Link className="ml-auto" href="/product-types/0">
              <Button className=" w-auto px-6" title={t("Users.add")} />
            </Link>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t("Users.name")}</TableCell>
                  <TableCell>{t("DirectoryDetail.Model")}</TableCell>
                  <TableCell>{t("Users.created")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productTypes?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Link
                        href={`/product-types/${row.id}`}
                        className="hover:text-primary"
                      >
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/product-types/${row.id}`}
                        className="hover:text-primary"
                      >
                        {row.model}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {new Date(row.createdAt).toLocaleString("ru-RU", {
                        timeZone: "Asia/Yekaterinburg",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};
