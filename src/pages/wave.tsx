import React, { Fragment, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { Header } from '../components';
import { useAppContext } from '../context/AppContext';
import { formatFromNow, reverseArr } from '../utils';
import contractABI from '../utils/WavePortal.json';

const wave = () => {
  const { state } = useAppContext();
  const { waves, account, waveContractAddress } = state;

  const [empty, setEmpty] = useState(false);
  const inputRef = useRef<any>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputRef?.current?.value) {
      setEmpty(true);
      return;
    }
    waveAtMe(inputRef?.current?.value);
    inputRef.current.value = '';
  };

  const waveAtMe = async (message: string) => {
    try {
      const { ethereum }: any = window;

      if (ethereum?.networkVersion !== '4') {
        toast.error('Sorry, this app works on rinkeby only');
        return;
      }

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          waveContractAddress,
          contractABI.abi,
          signer,
        );

        await wavePortalContract.wave(message, { gasLimit: 300000 });
      } else {
        // alert('Get MetaMask!');
        // console.log("Ethereum object doesn't exist!");
      }
    } catch (error: any) {
      toast.error(error?.error?.message || 'Something went wrong');
      // setLoading(false);
    }
  };

  return (
    <Fragment>
      <Header title="Welcome | Wave" />
      <div>
        <p>
          Waves:
          {waves.length}
        </p>
      </div>
      <div className="wave-container">
        <div className="header">
          {' '}
          <span role="img" aria-label="Wave emoji">
            👋
          </span>
          {' '}
          Hey there!
        </div>
        <div className="details">
          <p>
            Hiii, I am Oyediran Seun and i am learning web3. Wave at me and send a message or a
            playlist. Thanks
          </p>
        </div>
        <div>
          <form className="wave-form" onSubmit={onSubmit}>
            <motion.div className="input">
              <motion.input
                // whileFocus={{ borderColor: 'rgb(83, 74, 186)' }}
                whileFocus={{ borderColor: '#7166d2' }}
                ref={inputRef}
                type="text"
                autoFocus
                placeholder="Type your message"
                onChange={() => {
                  setEmpty(false);
                }}
              />
              {empty && <p className="error-text">Please enter a message or a link</p>}
            </motion.div>
            <div className="submit-btn">
              <motion.button type="submit" whileHover={{ scale: 1.05 }}>
                {' '}
                <span role="img" aria-label="Wave emoji">
                  👋
                </span>
                {' '}
                Wave at me
              </motion.button>
            </div>
          </form>
        </div>
        <motion.div className="messsages-con" layout>
          {reverseArr(waves).map((item: any, index) => (
            <motion.div className="message-container" layout key={index}>
              <div>
                <h5>{formatFromNow(new Date(item?.timestamp))}</h5>
              </div>
              <div>
                <h4>{item?.message}</h4>
                <p>
                  -
                  {item?.address.toLowerCase() === account ? 'You' : item.address}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Fragment>
  );
};

export default wave;
