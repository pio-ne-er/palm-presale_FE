import { createContext, ReactNode, useState } from "react";

export const HoverContext = createContext<{
  hover: string;
  setHover: (data: string) => void;
}>({
  hover: "",
  setHover: () => {},
});

export const HoverContextProvider = ({ children }: { children: ReactNode }) => {
  const [hover, setHover] = useState<string>("");

  return (
    <HoverContext.Provider value={{ hover, setHover }}>
      {children}
    </HoverContext.Provider>
  );
};

export const TabContext = createContext<{
  type: boolean;
  setType: (data: boolean) => void;
}>({
  type: true,
  setType: () => {},
});

export const TabContextProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<boolean>(true);

  return (
    <TabContext.Provider value={{ type, setType }}>
      {children}
    </TabContext.Provider>
  );
};
