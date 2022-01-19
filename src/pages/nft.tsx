import React, { Fragment, useEffect } from 'react';
import { Header } from '../components';

const nft = () => {
  useEffect(() => {}, []);
  return (
    <Fragment>
      <Header title="Welcome | NFTs" />
      <div>
        <p>Hello from nfts page</p>
      </div>
    </Fragment>
  );
};

export default nft;
