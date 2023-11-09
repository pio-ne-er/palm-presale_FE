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
