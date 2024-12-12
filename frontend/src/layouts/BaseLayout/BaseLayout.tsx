import { AppToast } from "@/components/AppToast";
import React from "react";

export const BaseLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <main className="text-black">{children}</main>
      <AppToast />
    </div>
  );
};
