import React, { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [selected, setSelected] = useState("");

  return (
    <SidebarContext.Provider value={{ selected, setSelected }}>
      {children}
    </SidebarContext.Provider>
  );
};
