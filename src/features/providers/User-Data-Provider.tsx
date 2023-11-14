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
}

interface UserDataProps {
  userData: UserContextProps["userData"];
  getUserData: UserContextProps["getUserData"];
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
};

const UserContext = createContext<UserContextProps>(defaultContext);

export const useUserData = (): UserDataProps => {
  const { userData, getUserData } = useContext(UserContext);
  return { userData, getUserData };
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<User>(defaultContext.userData);
  const [allNftList, setAllNftList] = useState<NftItem[]>([]);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

  const getUserData = async () => {};

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
