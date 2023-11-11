import axios from "axios";

export const getNonce = async (wallet: string) => {
  if (wallet) {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/nonce.get-nonce`,
      { wallet }
    );

    return res.data.nonce;
  }
};
