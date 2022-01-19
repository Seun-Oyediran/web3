import React, { Fragment, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import { useAppContext } from '../context/AppContext';
import { Header } from '../components';
import { SET_ACCOUNT } from '../context/namespaces';
import { routes } from '../routes';
import miningData from '../lottie/mining.json';

const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: miningData,
};

const Home: NextPage = () => {
  const router = useRouter();
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 });

  const { dispatch } = useAppContext();

  const connectWallet = async () => {
    try {
      const { ethereum }: any = window;

      if (!ethereum) {
        toast.info('Get MetaMask!');
        return;
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      dispatch({ type: SET_ACCOUNT, payload: accounts[0] });
      router.push(routes.wave.path);
      toast.success('Wallet connected successfully');
    } catch (error: any) {
      toast.error(error?.error?.message || 'Could not connect');
    }
  };

  return (
    <Fragment>
      <Header title="Welcome | Home" />
      <div className="dashboard-home-container">
        <div
          className="artwork d-md-flex justify-content-center d-none "
          onMouseMove={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            setPos({
              x: event.nativeEvent.pageX - 17,
              y: event.nativeEvent.pageY - 17,
              opacity: 1,
            });
            // console.log(event);
          }}
        >
          <motion.div
            className="follow-mouse"
            animate={{ left: pos.x, top: pos.y, opacity: pos.opacity }}
            transition={spring}
          />
          <div className="lottie-con">
            <Lottie options={defaultOptions} />
          </div>
        </div>
        <div className="content px-4 d-flex flex-column justify-content-center align-items-center">
          <h3 className="text-center mb-2">Welcome</h3>
          <p className="text-center">
            Connect your wallet to get started. A very basic web3 app built by Oyediran Seun
          </p>
          <p className="text-muted text-center my-1">
            Please make sure you have MetaMask installed. This app works on rinkeby ethereum
          </p>
          <div className="button-con">
            <motion.button onClick={connectWallet} whileHover={{ scale: 1.05 }} type="button">
              Connect Wallet
            </motion.button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
