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
import { TemperatureRangeType } from "../../../shared/types";

export const TemperatureRangeComponent = () => {
  const token = useAuthStore((state) => state.token);
  const getTemperatureRanges = () => api.getAllTemperatureRangeRequest(token);
  const { data: temperatureRanges = [], isLoading } = useQuery<
    TemperatureRangeType[]
  >({
    queryKey: ["temperatureRanges"],
    queryFn: getTemperatureRanges,
  });
  const t = useTranslations();
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="flex mb-2">
            <Link className="ml-auto" href="/temperature-ranges/0">
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
                {temperatureRanges?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Link
                        href={`/temperature-ranges/${row.id}`}
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
