import * as anchor from "@project-serum/anchor";
import {
  PublicKey,
  Connection,
  SystemProgram,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  ComputeBudgetProgram,
} from "@solana/web3.js";

import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { PROGRAM_ID as TOKEN_AUTH_RULES_ID } from "@metaplex-foundation/mpl-token-auth-rules";

import {
  METAPLEX,
  MPL_DEFAULT_RULE_SET,
  findTokenRecordPda,
  getAssociatedTokenAccount,
  getMasterEdition,
  getMetadata,
} from "./util";
import {
  ADMIN_ADDRESS,
  GLOBAL_AUTHORITY_SEED,
  USER_POOL_SEED,
} from "./constant";
import { WalletContextState } from "@solana/wallet-adapter-react";
import axios from "axios";

export const createInitUserTx = async (
  userAddress: PublicKey,
  program: anchor.Program
) => {
  const [userPool] = PublicKey.findProgramAddressSync(
    [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)],
    program.programId
  );

  try {
    const txId = await program.methods
      .initUser()
      .accounts({
        user: userAddress,
        userPool,
        systemProgram: SystemProgram.programId,
        rent: SYSVAR_RENT_PUBKEY,
      })
      .transaction();
    return txId;
  } catch (error) {
    console.log(error);
  }
};

export const createLockPnftTx = async (
  wallet: WalletContextState,
  nftMint: PublicKey,
  program: anchor.Program,
  connection: Connection
) => {
  const userAddress = wallet.publicKey;
  if (!userAddress) return;

  try {
    const [globalPool] = PublicKey.findProgramAddressSync(
      [Buffer.from(GLOBAL_AUTHORITY_SEED)],
      program.programId
    );

    const [userPool] = PublicKey.findProgramAddressSync(
      [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)],
      program.programId
    );

    const nftEdition = await getMasterEdition(nftMint);
    const tokenAccount = await getAssociatedTokenAccount(userAddress, nftMint);
    const mintMetadata = await getMetadata(nftMint);
    const tokenMintRecord = findTokenRecordPda(nftMint, tokenAccount);

    const tx = new Transaction();

    const poolAccount = await connection.getAccountInfo(userPool);
    if (poolAccount === null || poolAccount.data === null) {
      console.log("init User Pool");
      const tx_initUserPool = await createInitUserTx(userAddress, program);
      if (tx_initUserPool) {
        tx.add(tx_initUserPool);
      }
    }

    console.log("TSTSXTXWT");

    const txId = await program.methods
      .lockPnft()
      .accounts({
        admin: ADMIN_ADDRESS,
        globalPool,
        tokenAccount,
        tokenMint: nftMint,
        tokenMintEdition: nftEdition,
        tokenMintRecord,
        mintMetadata,
        authRules: MPL_DEFAULT_RULE_SET,
        sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
        signer: userAddress,
        userPool,
        tokenProgram: TOKEN_PROGRAM_ID,
        tokenMetadataProgram: METAPLEX,
        authRulesProgram: TOKEN_AUTH_RULES_ID,
        systemProgram: SystemProgram.programId,
      })
      .transaction();

    tx.add(txId);

    tx.feePayer = userAddress;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    if (wallet.signTransaction) {
      const txData = await wallet.signTransaction(tx);
      return txData.serialize({ requireAllSignatures: false });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createLockMultiPnftTx = async (
  wallet: WalletContextState,
  nftMints: string[],
  program: anchor.Program,
  connection: Connection,
  getNfts: () => void
) => {
  console.log("nftMints", nftMints);
  const userAddress = wallet.publicKey;
  if (!userAddress) return;

  try {
    const [globalPool] = PublicKey.findProgramAddressSync(
      [Buffer.from(GLOBAL_AUTHORITY_SEED)],
      program.programId
    );
    console.log("globalPool: ", globalPool.toBase58());

    const [userPool] = PublicKey.findProgramAddressSync(
      [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)],
      program.programId
    );
    console.log("userPool: ", userPool.toBase58());

    const txs: Transaction[] = [];

    for (let i = 0; i < nftMints.length; i++) {
      const mint = nftMints[i];

      const nftEdition = await getMasterEdition(new PublicKey(mint));
      console.log("nftEdition: ", nftEdition.toBase58());

      const tokenAccount = await getAssociatedTokenAccount(
        userAddress,
        new PublicKey(mint)
      );
      console.log("tokenAccount: ", tokenAccount.toBase58());

      const mintMetadata = await getMetadata(new PublicKey(mint));
      console.log("mintMetadata: ", mintMetadata.toBase58());

      const tokenMintRecord = findTokenRecordPda(
        new PublicKey(mint),
        tokenAccount
      );
      console.log("tokenMintRecord: ", tokenMintRecord.toBase58());

      const tx = new Transaction();

      const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
        units: 2000000,
      });
      const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1,
      });
      tx.add(modifyComputeUnits);
      tx.add(addPriorityFee);

      const txId = await program.methods
        .lockPnft()
        .accounts({
          admin: ADMIN_ADDRESS,
          globalPool,
          tokenAccount,
          tokenMint: new PublicKey(mint),
          tokenMintEdition: nftEdition,
          tokenMintRecord,
          mintMetadata,
          authRules: MPL_DEFAULT_RULE_SET,
          sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
          signer: userAddress,
          userPool,
          tokenProgram: TOKEN_PROGRAM_ID,
          tokenMetadataProgram: METAPLEX,
          authRulesProgram: TOKEN_AUTH_RULES_ID,
          systemProgram: SystemProgram.programId,
        })
        .transaction();

      tx.add(txId);

      tx.feePayer = userAddress;
      txs.push(tx);
    }
    const blockhash = (await connection.getLatestBlockhash()).blockhash;
    txs.map((tx) => (tx.recentBlockhash = blockhash));

    let tx_init = null;
    const poolAccount = await connection.getAccountInfo(userPool);
    if (poolAccount === null || poolAccount.data === null) {
      tx_init = await createInitUserTx(userAddress, program);
      if (tx_init) {
        tx_init.feePayer = userAddress;
        tx_init.recentBlockhash = blockhash;
      }
    }

    let confirm = 0;
    if (wallet.signAllTransactions) {
      const signedTxs =
        tx_init == null
          ? await wallet.signAllTransactions(txs)
          : await wallet.signAllTransactions([tx_init, ...txs]);

      if (tx_init) {
        console.log("sending init tx");
        const sTx = signedTxs[0].serialize();

        // Send the raw transaction
        const options = {
          commitment: "processed",
          skipPreflight: false,
        };
        // Confirm the transaction
        const signature = await connection.sendRawTransaction(sTx, options);
        const blockhash = await connection.getLatestBlockhash();

        const confirmed = await connection.confirmTransaction(
          {
            signature,
            blockhash: blockhash.blockhash,
            lastValidBlockHeight: blockhash.lastValidBlockHeight,
          },
          "processed"
        );

        console.log("init tx: ", confirmed);
      }

      if (tx_init) signedTxs.shift();

      await Promise.all(
        signedTxs.map(async (o) => {
          const encodedTx = Buffer.from(
            o.serialize({ requireAllSignatures: false })
          ).toString("base64");
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/stake/lock`,
            {
              encodedTx: encodedTx,
              user: wallet.publicKey?.toBase58(),
            }
          );

          if (res.status == 200) confirm += 1;
        })
      );
      await getNfts();
      // successAlert(`Successfully locked ${confirmed} NFTs`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const createUnlockPnftTx = async (
  wallet: WalletContextState,
  nftMint: PublicKey,
  program: anchor.Program,
  connection: Connection
) => {
  const userAddress = wallet.publicKey;
  if (!userAddress) return;

  const [globalPool] = PublicKey.findProgramAddressSync(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    program.programId
  );
  console.log("globalPool: ", globalPool.toBase58());

  const [userPool] = PublicKey.findProgramAddressSync(
    [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)],
    program.programId
  );
  console.log("userPool: ", userPool.toBase58());

  const nftEdition = await getMasterEdition(nftMint);
  console.log("nftEdition: ", nftEdition.toBase58());

  const tokenAccount = await getAssociatedTokenAccount(userAddress, nftMint);
  console.log("tokenAccount: ", tokenAccount.toBase58());

  const mintMetadata = await getMetadata(nftMint);
  console.log("mintMetadata: ", mintMetadata.toBase58());

  const tokenMintRecord = findTokenRecordPda(nftMint, tokenAccount);
  console.log("tokenMintRecord: ", tokenMintRecord.toBase58());

  const tx = new Transaction();

  const txId = await program.methods
    .unlockPnft()
    .accounts({
      admin: ADMIN_ADDRESS,
      globalPool,
      tokenAccount,
      tokenMint: nftMint,
      tokenMintEdition: nftEdition,
      tokenMintRecord,
      mintMetadata,
      authRules: MPL_DEFAULT_RULE_SET,
      sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
      signer: userAddress,
      userPool,
      tokenProgram: TOKEN_PROGRAM_ID,
      tokenMetadataProgram: METAPLEX,
      authRulesProgram: TOKEN_AUTH_RULES_ID,
      systemProgram: SystemProgram.programId,
    })
    .transaction();

  tx.add(txId);

  tx.feePayer = userAddress;
  tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  if (wallet.signTransaction) {
    try {
      const txData = await wallet.signTransaction(tx);
      console.log("signed user: ", userAddress.toBase58());
      return txData.serialize({ requireAllSignatures: false });
    } catch (error) {}
  }
};
export const createUnlockPnftMultiTx = async (
  wallet: WalletContextState,
  nftMints: string[],
  program: anchor.Program,
  connection: Connection,
  getNfts: () => void
) => {
  const userAddress = wallet.publicKey;
  if (!userAddress) return;

  const [globalPool] = PublicKey.findProgramAddressSync(
    [Buffer.from(GLOBAL_AUTHORITY_SEED)],
    program.programId
  );
  console.log("globalPool: ", globalPool.toBase58());

  const [userPool] = PublicKey.findProgramAddressSync(
    [userAddress.toBuffer(), Buffer.from(USER_POOL_SEED)],
    program.programId
  );
  console.log("userPool: ", userPool.toBase58());
  const txs: Transaction[] = [];
  for (const mint of nftMints) {
    const nftEdition = await getMasterEdition(new PublicKey(mint));
    console.log("nftEdition: ", nftEdition.toBase58());

    const tokenAccount = await getAssociatedTokenAccount(
      userAddress,
      new PublicKey(mint)
    );
    console.log("tokenAccount: ", tokenAccount.toBase58());

    const mintMetadata = await getMetadata(new PublicKey(mint));
    console.log("mintMetadata: ", mintMetadata.toBase58());

    const tokenMintRecord = findTokenRecordPda(
      new PublicKey(mint),
      tokenAccount
    );
    console.log("tokenMintRecord: ", tokenMintRecord.toBase58());

    const tx = new Transaction();

    const txId = await program.methods
      .unlockPnft()
      .accounts({
        admin: ADMIN_ADDRESS,
        globalPool,
        tokenAccount,
        tokenMint: new PublicKey(mint),
        tokenMintEdition: nftEdition,
        tokenMintRecord,
        mintMetadata,
        authRules: MPL_DEFAULT_RULE_SET,
        sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
        signer: userAddress,
        userPool,
        tokenProgram: TOKEN_PROGRAM_ID,
        tokenMetadataProgram: METAPLEX,
        authRulesProgram: TOKEN_AUTH_RULES_ID,
        systemProgram: SystemProgram.programId,
      })
      .transaction();

    tx.add(txId);

    tx.feePayer = userAddress;
    txs.push(tx);
  }
  let confirm = 0;

  const blockhash = (await connection.getLatestBlockhash()).blockhash;
  txs.map((tx) => (tx.recentBlockhash = blockhash));

  if (wallet.signAllTransactions) {
    const signedTxs = await wallet.signAllTransactions(txs);
    await Promise.all(
      signedTxs.map(async (o) => {
        const encodedTx = Buffer.from(
          o.serialize({ requireAllSignatures: false })
        ).toString("base64");
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/stake/unlock`,
          {
            encodedTx: encodedTx,
            user: wallet.publicKey?.toBase58(),
          }
        );

        if (res.status == 200) confirm += 1;
      })
    );
    await getNfts();
    // successAlert(`Successfully unlocked ${confirmed} NFTs`);
  }
};
