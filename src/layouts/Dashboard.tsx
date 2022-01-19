import React, { ReactNode, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { DashboardSideBar, MobileSideBar, Navbar } from '../components';
import { useAppContext } from '../context/AppContext';
import { SET_ACCOUNT } from '../context/namespaces';
import { routes } from '../routes';

interface IProps {
  children: ReactNode;
}

const variants = {
  hidden: { opacity: 0, x: 0, y: 150 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 150 },
};

const Dashboard = (props: IProps) => {
  const { children } = props;
  const router = useRouter();
  const { dispatch } = useAppContext();
  // const { account } = state;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum }: any = window;

      if (!ethereum) {
        router.push(routes.home.path);
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        dispatch({ type: SET_ACCOUNT, payload: account });
      } else {
        toast.error('Please connect your wallet first');
        router.push(routes.home.path);
      }
    } catch (error) {
      router.push(routes.home.path);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div>
      <div className="app-dashboard-container">
        <MobileSideBar />
        <DashboardSideBar />
        <div className="main-content">
          <div>
            <Navbar />
          </div>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              variants={variants} // Pass the variant object into Framer Motion
              initial="hidden" // Set the initial state to variants.hidden
              animate="enter" // Animated state to variants.enter
              exit="exit" // Exit state (used later) to variants.exit
              transition={{ type: 'linear' }} // Set the transition to linear
              key={router.route}
              className="page-content scrollbar"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* <div>{children}</div> */}
    </div>
  );
};

export default Dashboard;
