import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { sideBarItemArray } from '../../utils';
// import { useAppContext } from '../../context/AppContext';

const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

const SIdeBar = () => {
  const router = useRouter();
  // const { dispatch } = useAppContext();

  return (
    <div className="app-dashboard-sidebar scrollbar">
      <div>
        <div className="sidebar-logo">
          <a style={{ textDecoration: 'none' }} href="https://github.com/Seun-Oyediran">
            <div className="d-flex justify-content-center">
              <div style={{ maxWidth: '180px' }} className="image">
                <img className="img-fluid" src="./images/avatar.png" alt="avatar" />
              </div>
            </div>
            <div>
              <h5 className="text-center mt-2 text-dark">Oyediran Seun </h5>
              <p style={{ fontSize: '12px' }} className="text-muted font-weight-light text-center">
                Web and mobile developer
              </p>
            </div>
          </a>
        </div>
        <div className="links-container">
          {sideBarItemArray.map((item, index) => (
            <Link key={index} href={item.link}>
              <a href={item.link}>
                <motion.div
                  whileHover={{ opacity: 0.8 }}
                  className={router.pathname === item.link ? 'link-con active' : 'link-con'}
                >
                  {router.pathname === item.link && (
                    <motion.div
                      layoutId="borderAnimation"
                      transition={spring}
                      className="inner-link"
                    />
                  )}
                  <div className="content">
                    <i className={item.icon} />
                    <p>{item.name}</p>
                  </div>
                </motion.div>
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className="disconnect-btn-con">
        <button type="button">
          <i className="fas fa-sign-out-alt" />
          Connected
        </button>
      </div>
    </div>
  );
};

export default SIdeBar;
