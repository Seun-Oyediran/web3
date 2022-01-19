import React, { Fragment, useEffect } from 'react';
import { Header } from '../components';

const vote = () => {
  useEffect(() => {}, []);
  return (
    <Fragment>
      <Header title="Welcome | Vote" />
      <div>
        <p>Hello from voting page</p>
      </div>
    </Fragment>
  );
};

export default vote;
