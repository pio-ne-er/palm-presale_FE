import axios from "axios";

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
