import { TransferWrapper } from "./index.styled";
import { BlackLine } from "../../ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { FC, useEffect, useState } from "react";
import { web3 } from "@project-serum/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const Transfer: FC = () => {
  const [txSig, setTxSig] = useState("");
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState(0.1);
  const { connection } = useConnection();
  // const link = () => {
  //   return txSig
  //     ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
  //     : "";
  // };
  
  useEffect(() => {
    if (publicKey && connection)
      console.log("wallet connected correctly!");
  }, [publicKey, connection]);

  useEffect(() => {
    if (txSig)
    alert("Successfully bought the $Palm tokens!")
  }, [txSig])
  
  const recipientPubKey = new web3.PublicKey("5kzdBDkfwMRgWSTNriURBEjjKVHG8WpxMCdfKorqsrBN");

  const sendSol = () => {
    if (!connection || !publicKey) {
      return;
    }
    const transaction = new web3.Transaction();

    const sendSolInstruction = web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: recipientPubKey,
      lamports: LAMPORTS_PER_SOL * amount
    })

    transaction.add(sendSolInstruction);
    sendTransaction(transaction, connection).then(sig => {
      setTxSig(sig)
    })
  };

  return (
    <TransferWrapper>
      <p>
        Wallet Connected: &nbsp;
        <span className="wallet-address">{ publicKey?.toString() }</span>
      </p>
        <div className="send-form">
          <div>
            <div className="btn-container value">
              <input type="text" id="amount" className="amount" placeholder="0.1" autoSave="off" autoComplete="off" onChange={(e) => setAmount(Number(e.target.value))} required/>
            </div>
            <button onClick={sendSol} className="btn-container btn">Send</button>
          </div>
        </div>
        <p>or transfer to this address</p>
        <div className="address">
          <span className="des-account">{ recipientPubKey.toString() }</span>
        </div>
      {/* {
        txSig ?
          <div><p>View your transaction on </p>
          <a href={link()}>Solana Explorer</a></div> : null
      } */}
      <div className="criteria">
        <ul>
          <li>Transfer 0.1 Sol to the wallet address</li>
          <li>Wait for the presale end</li>
          <li>
            48 hours after the end, token $PALM will be received in your wallet
          </li>
          <li>Do not transfer from exchanges, use a DEX wallet</li>
        </ul>
        <div>
          <img src="img/qr.png" alt="qr-sign" className="qr-sign" />
        </div>
      </div>
      <BlackLine />
    </TransferWrapper>
  );
};
