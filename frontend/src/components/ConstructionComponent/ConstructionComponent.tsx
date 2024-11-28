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
import { ConstructionType } from "../../../shared/types";

export const ConstructionComponent = () => {
  const token = useAuthStore((state) => state.token);
  const getConstructions = () => api.getAllConstructionsRequest(token);
  const { data: constructions = [], isLoading } = useQuery<ConstructionType[]>({
    queryKey: ["constructions"],
    queryFn: getConstructions,
  });
  const t = useTranslations();
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="flex mb-2">
            <Link className="ml-auto" href="/constructions/0">
              <Button className=" w-auto px-6" title={t("Users.add")} />
            </Link>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t("Users.name")}</TableCell>
                  <TableCell>{t("Users.created")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {constructions?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Link
                        href={`/constructions/${row.id}`}
                        className="hover:text-primary"
                      >
                        {row.name}
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
