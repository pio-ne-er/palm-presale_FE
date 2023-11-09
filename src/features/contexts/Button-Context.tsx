import { createContext, ReactNode, useState } from "react";

export const HoverContext = createContext<{
  hover: boolean;
  setHover: (data: boolean) => void;
}>({
  hover: false,
  setHover: () => {},
});

export const HoverContextProvider = ({ children }: { children: ReactNode }) => {
  const [hover, setHover] = useState<boolean>(false);

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
