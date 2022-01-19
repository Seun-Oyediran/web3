import React, { Fragment, useState } from 'react';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Header } from '../components';
import { useAppContext } from '../context/AppContext';
import myEpicNft from '../utils/MyEpicNFT.json';
import { handleError } from '../utils';

const Nft = () => {
  const { state } = useAppContext();
  const { nftContractAddress, totalNFT, mintedNFT } = state;
  const [minting, setMinting] = useState(false);

  const askContractToMintNft = async () => {
    setMinting(true);
    try {
      const { ethereum }: any = window;

      if (ethereum?.networkVersion !== '4') {
        toast.error('Sorry, this app works on rinkeby only');
        return;
      }

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(nftContractAddress, myEpicNft.abi, signer);

        const nftTxn = await connectedContract.makeAnEpicNFT();

        await nftTxn.wait();

        toast.info(
          <div>
            Minted,
            <br />
            <a
              href={`https://rinkeby.etherscan.io/tx/${nftTxn.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pl-1 d-inline"
            >
              View on etharscan here
            </a>
          </div>,
          {
            autoClose: false,
            closeOnClick: false,
          },
        );

        setMinting(false);
      } else {
        setMinting(false);
      }
    } catch (error) {
      setMinting(false);
      toast.error(handleError(error));
    }
  };

  return (
    <Fragment>
      <Header title="Welcome | NFTs" />
      <div>
        <p>
          Mints:
          {`${mintedNFT}/${totalNFT}`}
        </p>
      </div>
      <div className="wave-container nft-page-con">
        <div className="header">
          {' '}
          <span role="img" aria-label="Wave emoji">
            👋
          </span>
          Seun&apos;s NFT Collection
        </div>
        <div className="details">
          <p>The best NFT artwork created so far</p>
        </div>
        <div className="submit-btn">
          <a
            target="_blank"
            href="https://testnets.opensea.io/collection/squarenft-itlsmjjuzs"
            rel="noreferrer"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 0.96 }}
              className="bg-transparent text-dark opensea-btn"
            >
              <img src="./images/opensea.svg" alt="open sea" />
              View Collection on Opensea
            </motion.button>
          </a>
        </div>
        <div className="submit-btn">
          <motion.button
            type="button"
            disabled={minting}
            onClick={askContractToMintNft}
            whileHover={{ scale: 0.96 }}
          >
            {minting ? <span>Minting...</span> : <span>Mint NFT</span>}
          </motion.button>
        </div>
      </div>
    </Fragment>
  );
};

export default Nft;
