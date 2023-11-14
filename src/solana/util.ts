/* eslint-disable @typescript-eslint/no-explicit-any */
import * as anchor from "@project-serum/anchor";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { IDL } from "../solana/idl";
import { PROGRAM_ID } from "../solana/constant";

import {
  createLockMultiPnftTx,
  createLockPnftTx,
  createUnlockPnftTx,
  createUnlockPnftMultiTx,
} from "./transaction";
import { solConnection } from "utilities";

export const METAPLEX = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
export const MPL_DEFAULT_RULE_SET = new PublicKey(
  "AdH2Utn6Fus15ZhtenW4hZBQnvtLgM1YCW2MfVp7pYS5"
);

const getAssociatedTokenAccount = async (
  ownerPubkey: PublicKey,
  mintPk: PublicKey
): Promise<PublicKey> => {
  const associatedTokenAccountPubkey = PublicKey.findProgramAddressSync(
    [
      ownerPubkey.toBuffer(),
      TOKEN_PROGRAM_ID.toBuffer(),
      mintPk.toBuffer(), // mint address
    ],
    ASSOCIATED_TOKEN_PROGRAM_ID
  )[0];

  return associatedTokenAccountPubkey;
};

const createAssociatedTokenAccountInstruction = (
  associatedTokenAddress: anchor.web3.PublicKey,
  payer: anchor.web3.PublicKey,
  walletAddress: anchor.web3.PublicKey,
  splTokenMintAddress: anchor.web3.PublicKey
) => {
  const keys = [
    { pubkey: payer, isSigner: true, isWritable: true },
    { pubkey: associatedTokenAddress, isSigner: false, isWritable: true },
    { pubkey: walletAddress, isSigner: false, isWritable: false },
    { pubkey: splTokenMintAddress, isSigner: false, isWritable: false },
    {
      pubkey: anchor.web3.SystemProgram.programId,
      isSigner: false,
      isWritable: false,
    },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    {
      pubkey: anchor.web3.SYSVAR_RENT_PUBKEY,
      isSigner: false,
      isWritable: false,
    },
  ];
  return new anchor.web3.TransactionInstruction({
    keys,
    programId: ASSOCIATED_TOKEN_PROGRAM_ID,
    data: Buffer.from([]),
  });
};

const getATokenAccountsNeedCreate = async (
  connection: anchor.web3.Connection,
  walletAddress: anchor.web3.PublicKey,
  owner: anchor.web3.PublicKey,
  nfts: anchor.web3.PublicKey[]
) => {
  const instructions = [],
    destinationAccounts = [];
  for (const mint of nfts) {
    const destinationPubkey = await getAssociatedTokenAccount(owner, mint);
    let response = await connection.getAccountInfo(destinationPubkey);
    if (!response) {
      const createATAIx = createAssociatedTokenAccountInstruction(
        destinationPubkey,
        walletAddress,
        owner,
        mint
      );
      instructions.push(createATAIx);
    }
    destinationAccounts.push(destinationPubkey);
    if (walletAddress != owner) {
      const userAccount = await getAssociatedTokenAccount(walletAddress, mint);
      response = await connection.getAccountInfo(userAccount);
      if (!response) {
        const createATAIx = createAssociatedTokenAccountInstruction(
          userAccount,
          walletAddress,
          walletAddress,
          mint
        );
        instructions.push(createATAIx);
      }
    }
  }
  return {
    instructions,
    destinationAccounts,
  };
};

/** Get metaplex mint metadata account address */
const getMetadata = async (mint: PublicKey): Promise<PublicKey> => {
  return (
    await PublicKey.findProgramAddress(
      [Buffer.from("metadata"), METAPLEX.toBuffer(), mint.toBuffer()],
      METAPLEX
    )
  )[0];
};

const getMasterEdition = async (
  mint: anchor.web3.PublicKey
): Promise<anchor.web3.PublicKey> => {
  return (
    await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("metadata"),
        METAPLEX.toBuffer(),
        mint.toBuffer(),
        Buffer.from("edition"),
      ],
      METAPLEX
    )
  )[0];
};

export function findTokenRecordPda(
  mint: PublicKey,
  token: PublicKey
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      METAPLEX.toBuffer(),
      mint.toBuffer(),
      Buffer.from("token_record"),
      token.toBuffer(),
    ],
    METAPLEX
  )[0];
}

export const stakeNFT = async (
  wallet: WalletContextState,
  mint: string,
  setLoading: (data: boolean) => void
) => {
  if (!wallet.publicKey) return;
  setLoading(true);
  const cloneWindow: any = window;
  const provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
  const tx = await createLockPnftTx(
    wallet,
    new PublicKey(mint),
    program,
    solConnection
  );
  const stakeTransaction = tx?.toString("base64");
  console.log(tx);
  setLoading(false);
  return stakeTransaction;
};

export const stakeMultiNFT = async (
  wallet: WalletContextState,
  mints: string[],
  setLoading: (data: boolean) => void,
  getNfts: () => void
) => {
  if (!wallet.publicKey) return;
  setLoading(true);
  const cloneWindow: any = window;
  const provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);

  await createLockMultiPnftTx(wallet, mints, program, solConnection, getNfts);
  setLoading(false);
};

export const unStakeNFT = async (
  wallet: WalletContextState,
  mint: string,
  setLoading: (data: boolean) => void
) => {
  if (!wallet.publicKey) return;
  setLoading(true);
  const cloneWindow: any = window;
  const provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
  const tx = await createUnlockPnftTx(
    wallet,
    new PublicKey(mint),
    program,
    solConnection
  );

  const unStakeTransaction = tx?.toString("base64");
  console.log(tx);
  setLoading(false);
  return unStakeTransaction;
};

export const unStakeMultiNFT = async (
  wallet: WalletContextState,
  mints: string[],
  setLoading: (data: boolean) => void,
  getNfts: () => void
) => {
  if (!wallet.publicKey) return;
  setLoading(true);
  const cloneWindow: any = window;
  const provider = new anchor.AnchorProvider(
    solConnection,
    cloneWindow["solana"],
    anchor.AnchorProvider.defaultOptions()
  );
  const program = new anchor.Program(IDL as anchor.Idl, PROGRAM_ID, provider);
  await createUnlockPnftMultiTx(wallet, mints, program, solConnection, getNfts);
};

export const getNftDetail = async (uri: string) => {
  try {
    // const response = await axios.get(uri);
    const response = (await Promise.race([
      fetch(uri, { method: "GET" }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Timeout")), 60000)
      ),
    ])) as Response;

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(
        `Failed to fetch NFT detail. Status code: ${response.status}`
      );
    }
  } catch (error) {
    // Handle any errors that might occur during the HTTP request
    console.log("fetch nft detail error: ", error);
  }
  return null;
};

export const getShortAddress = (address: string) => {
  const prefix = address.slice(0, 5);
  const suffix = address.slice(-5);
  return `${prefix}...${suffix}`;
};

export {
  getAssociatedTokenAccount,
  getATokenAccountsNeedCreate,
  getMetadata,
  getMasterEdition,
};
