/* eslint-disable @typescript-eslint/no-explicit-any */
import { MainButton } from "@features/buttons";
import { useWindowSize } from "@features/hooks";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { NftItem, solConnection } from "utilities";
import video from "../assets/video/map.mp4";

import * as anchor from "@project-serum/anchor";
import { PROGRAM_ID } from "solana/constant";
import { IDL } from "solana/idl";
import { createLockPnftTx, createUnlockPnftTx } from "solana/transaction";
import { PublicKey } from "@solana/web3.js";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { getNft } from "api";
import { getNftDetail } from "solana/util";
import { useToast } from "@features/toast";

interface VideoProps {
  $width: number;
  $height: number;
}

const StyleMainBoard = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const StyleVideoContent = styled.div``;

const StyleVideo = styled.video<VideoProps>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
`;

export default function GamePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const videoContent = useRef<HTMLDivElement>(null);

  const [viewHeight, setViewHeight] = useState<number>(0);
  const [viewWidth, setViewWidth] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { width, height } = useWindowSize();
  const wallet = useWallet();
  const toast = useToast();

  useEffect(() => {
    if (width * 9 === height * 16) {
      setViewHeight(height);
      setViewWidth(width);
    } else if (width * 9 > height * 16) {
      setViewHeight((width * 9) / 16);
      setViewWidth(width);
    } else {
      setViewHeight(height);
      setViewWidth((height * 16) / 9);
    }
  }, [width, height]);

  useEffect(() => {
    console.log("wid", viewHeight, viewWidth);
  }, [viewHeight]);

  useEffect(() => {
    // if (viewport.current && viewWidth > 0) {
    //   const view = new ScrollBooster({
    //     viewport: viewport.current,
    //     content: videoContent.current!,
    //     scrollMode: "transform",
    //     direction: "all",
    //     emulateScroll: true,
    //     bounce: false,
    //   });
    //   view.scrollTo({
    //     x: (viewWidth - viewport.current.clientWidth) / 2,
    //     y: 0,
    //   });
    // }
  }, [viewWidth, viewport]);

  const unstake = async (mint: string) => {
    if (!wallet.publicKey) return;
    setIsLoading(true);
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

    setIsLoading(false);
    if (tx) {
      const unStakeTransaction = tx.toString("base64");
      toast.open({ title: "Complete unstake NFT.", state: true });
      return unStakeTransaction;
    } else {
      toast.open({ title: "Could not unstake NFT.", state: false });
      return;
    }
  };

  const stake = async (mint: string) => {
    if (!wallet.publicKey) return;
    setIsLoading(true);
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
    setIsLoading(false);
    if (tx) {
      const StakeTransaction = tx?.toString("base64");
      toast.open({ title: "Complete stake NFT.", state: true });
      return StakeTransaction;
    } else {
      toast.open({ title: "Could not stake NFT.", state: false });
      return;
    }
  };

  useEffect(() => {
    const getNfts = async () => {
      if (!wallet.publicKey) return [];

      const [nftList, stakedData] = await Promise.all([
        getParsedNftAccountsByOwner({
          publicAddress: wallet.publicKey.toBase58(),
          connection: solConnection,
        }),
        getNft(wallet.publicKey.toBase58()),
      ]);

      const nfts: NftItem[] = [];
      console.log("alll", nftList);

      await Promise.all(
        nftList.map(async (item) => {
          if (
            item.data.creators &&
            item.data.creators[0]?.verified === 1 &&
            item.data.creators[0]?.address ===
              import.meta.env.VITE_CREATOR_ADDRESS
          ) {
            const data = await getNftDetail(item.data.uri);

            if (data) {
              const stakedNft = stakedData.find(
                (nft) => nft.mint === item.mint
              );

              nfts.push({
                name: data.name,
                image: data.image,
                description: data.description,
                staked: stakedNft ? true : false,
                user: wallet.publicKey ? wallet.publicKey.toBase58() : "",
                startTime: stakedNft ? stakedNft.startTime : "",
                mint: item.mint,
                uri: item.data.uri,
                faction: stakedNft ? stakedNft.faction : "",
              });
            }
          }
        })
      );
      return nfts;
    };
    const get = async () => {
      const nftlist = await getNfts();
      console.log("Nft-----", nftlist);
    };
    get();
  }, []);

  return (
    <StyleMainBoard ref={viewport}>
      <StyleVideoContent ref={videoContent}>
        <StyleVideo
          ref={videoRef}
          autoPlay
          playsInline
          loop
          muted
          src={video}
          $width={viewWidth}
          $height={viewHeight}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <MainButton
            width={144}
            color="white"
            title="Stake"
            loading={isLoading}
            onClick={() =>
              stake("3XSAvEQ78wfTxDgNp5XMLpGrMUc9v8bCq8sisZnGRiic")
            }
          />
          <MainButton
            width={144}
            color="white"
            title="Unstake"
            loading={isLoading}
            onClick={() =>
              unstake("3XSAvEQ78wfTxDgNp5XMLpGrMUc9v8bCq8sisZnGRiic")
            }
          />
        </div>
      </StyleVideoContent>
    </StyleMainBoard>
  );
}
