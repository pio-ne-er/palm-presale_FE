import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { getNonce } from "api";
import { createContext, ReactNode, useContext, useState } from "react";
import { NftItem, User } from "utilities";

interface UserContextProps {
  userData: User;
  setUserData: (data: User) => void;
  getUserData: () => void;
  allNftList: NftItem[];
  setAllNftList: (data: NftItem[]) => void;
  isDataLoading: boolean;
  setIsDataLoading: (data: boolean) => void;
  sign: (data: boolean) => void;
  isSignning: boolean;
}

interface UserDataProps {
  userData: UserContextProps["userData"];
  getUserData: UserContextProps["getUserData"];
  sign: (data: boolean) => void;
  isSignning: boolean;
}

const defaultContext: UserContextProps = {
  userData: {
    username: "",
    wallet: "",
    image: "",
  },
  setUserData: () => {},
  getUserData: () => {},
  allNftList: [],
  setAllNftList: () => {},
  isDataLoading: false,
  setIsDataLoading: () => {},
  sign: () => {},
  isSignning: false,
};

const UserContext = createContext<UserContextProps>(defaultContext);

export const useUserData = (): UserDataProps => {
  const { userData, getUserData, sign, isSignning } = useContext(UserContext);
  return { userData, getUserData, sign, isSignning };
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<User>(defaultContext.userData);
  const [allNftList, setAllNftList] = useState<NftItem[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [isSignning, setIsSignning] = useState<boolean>(false);

  const wallet = useWallet();
  const walletModal = useWalletModal();

  const getUserData = async () => {};

  const sign = async (isLedger: boolean) => {
    setIsSignning(true);
    try {
      if (!wallet.publicKey) {
        walletModal.setVisible(true);
        return;
      }
      console.log("hi", isLedger);

      const nonce = await getNonce(wallet.publicKey.toBase58());
      console.log("Nonce", nonce);
      // const statement = `Authorize your wallet. nonce: ${nonce}`;
      localStorage.setItem("nonce", nonce);
    } catch (error) {
      console.log("Sign error", error);
    } finally {
      setIsSignning(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        getUserData,
        allNftList,
        setAllNftList,
        isDataLoading,
        setIsDataLoading,
        sign,
        isSignning,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
