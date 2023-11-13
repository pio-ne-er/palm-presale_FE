export interface routerType {
  title: string;
  path: string;
  element: JSX.Element;
}

export interface NftItem {
  mint: string;
  name: string;
  description: string;
  staked: boolean;
  image: string;
  user: string;
  startTime: string;
  uri: string;
  faction: string;
}

export interface User {
  username: string;
  wallet: string;
  image: string;
}

export interface ToastInfoProps {
  id: string;
  title: string;
  state: boolean;
}

export interface ToastSettingProps {
  position: string;
  auto: boolean;
  time: number;
}

export const Landing_Page_Intet = [
  {
    title: "Miner",
    description: `The lifeblood of this ecosystem.\n\nThey earn their way directly through labor, receiving a cut of the resources they mine.`,
    image: "src/assets/ui/governor.jpg",
  },
];

export const Toast_Text_List = {
  err_connect_wallet: "Can not connect the wallet.",
  err_install_wallet: "Please install correct wallet.",
  confirm_connect_wallet: "Connected the wallet.",
};
