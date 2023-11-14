import axios from "axios";
import { StakeItem } from "utilities";

export const getNonce = async (wallet: string) => {
  if (wallet) {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/nonce/get-nonce`,
      { wallet }
    );

    return res.data.nonce;
  }
};

export const authorizeUser = async (
  wallet: string,
  signature: string,
  nonce: string,
  isLedger?: boolean
) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/user/authorize`,
    {
      wallet,
      signature,
      nonce,
      isLedger,
    }
  );

  if (res.status === 200) return true;
  return false;
};

export const getNft = async (wallet: string) => {
  const nfts: StakeItem[] = [];
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/stake/findByWallet/${wallet}`
    );
    console.log("res", res);
    if (res.data) {
      res.data.map((item: StakeItem) => {
        nfts.push({
          faction: item.faction,
          image: item.image,
          mint: item.mint,
          startTime: item.startTime,
          uri: item.uri,
          user: item.user,
        });
      });
    }
    return nfts;
  } catch (error) {
    return nfts;
  }
};
