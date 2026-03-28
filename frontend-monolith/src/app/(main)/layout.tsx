import { Header } from "@/components/Header";
import React from "react";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
