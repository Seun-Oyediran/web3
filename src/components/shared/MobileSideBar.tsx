import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { sideBarItemArray } from '../../utils';
import { useAppContext } from '../../context/AppContext';
import { TOGGLE_SIDEBAR } from '../../context/namespaces';
// import { useAppContext } from '../../context/AppContext';

const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

const MobileSideBar = () => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const { sideBar } = state;

  const handleCloseMenu = (e: any) => {
    e.preventDefault();
    if (e.target.classList.contains('sidemenu-overlay')) {
      dispatch({ type: TOGGLE_SIDEBAR });
    }
  };

  useEffect(() => {
    if (sideBar) {
      dispatch({ type: TOGGLE_SIDEBAR });
    }
  }, [router.route]);

  return (
    <AnimatePresence>
      {sideBar && (
        <motion.div
          onClick={handleCloseMenu}
          initial={{ width: '0px' }}
          animate={{ width: '100%' }}
          exit={{ width: '0px' }}
          className="sidemenu-overlay"
        >
          <motion.div
            initial={{ width: '0px', padding: '0px' }}
            animate={{ width: '260px', padding: '15px 10px', paddingTop: '0px' }}
            exit={{ width: '0px', padding: '0px' }}
            className="app-dashboard-sidebar mobile scrollbar"
          >
            <div>
              <div className="sidebar-logo">
                <a style={{ textDecoration: 'none' }} href="https://github.com/Seun-Oyediran">
                  <div className="d-flex justify-content-center">
                    <div style={{ maxWidth: '150px' }} className="image">
                      <img className="img-fluid" src="./images/avatar.png" alt="avatar" />
                    </div>
                  </div>
                  <div>
                    <h5 className="text-center mt-2 text-dark">Oyediran Seun </h5>
                    <p
                      style={{ fontSize: '12px' }}
                      className="text-muted font-weight-light text-center"
                    >
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
                            layoutId="mobileBorderAnimation"
                            transition={spring}
                            className="inner-link"
                          />
                        )}
                        <motion.div
                          initial={{ opacity: 0, translateX: '100px' }}
                          animate={{ opacity: 1, translateX: '0px' }}
                          exit={{ opacity: 0, translateX: '100px' }}
                          transition={{ delay: 0.15 * (index + 1) }}
                          className="content"
                        >
                          <i className={item.icon} />
                          <p>{item.name}</p>
                        </motion.div>
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSideBar;
