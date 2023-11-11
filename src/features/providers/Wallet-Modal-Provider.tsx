import { FC, useState, ReactNode } from "react";
import {
  WalletModal,
  WalletModalContext,
  WalletModalProps,
} from "@solana/wallet-adapter-react-ui";

interface WalletModalProviderProps extends WalletModalProps {
  children: ReactNode;
}

export const WalletModalProvider: FC<WalletModalProviderProps> = ({
  children,
  ...props
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <WalletModalContext.Provider value={{ visible, setVisible }}>
      {children}
      {visible && <WalletModal {...props} />}
    </WalletModalContext.Provider>
  );
};
