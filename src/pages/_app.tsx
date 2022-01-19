import React from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import { DashboardLayout } from '../layouts';
import ContextProvider from '../context/AppContext';
import { routes } from '../routes';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../public/css/global.css';
import '../../public/css/responsive.css';
import '../../public/css/custom.css';

const appRoutes = [routes.nft.path, routes.wave.path, routes.vote.path];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <ContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {!appRoutes.includes(router.route) ? (
        <Component {...pageProps} />
      ) : (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      )}
    </ContextProvider>
  );
}

export default MyApp;
