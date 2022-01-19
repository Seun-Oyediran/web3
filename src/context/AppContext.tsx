import { ethers, utils } from 'ethers';
import React, {
  createContext, ReactNode, useReducer, Dispatch, useEffect,
} from 'react';
import { toast } from 'react-toastify';
import {
  GET_ALL_WAVES,
  SET_ACCOUNT,
  SET_ETH_BALANCE,
  SET_MINTED_NFT,
  SET_TOTAL_NFT,
  START_CONNECT_WALLET,
  START_WAVE_AT_ME,
  STOP_WAVE_AT_ME,
  TOGGLE_SIDEBAR,
  UPDATE_ALL_WAVES,
} from './namespaces';
import contractABI from '../utils/WavePortal.json';
import myEpicNft from '../utils/MyEpicNFT.json';
import { handleError } from '../utils';

interface IProps {
  children: ReactNode;
}

interface IAction {
  type: string;
  payload: any;
}

const initialState = {
  count: 0,
  loggedIn: false,
  waveLaoding: false,
  sideBar: false,
  account: '',
  waveContractAddress: '0x03A23B8854F2a79113bd4B1030Ec9A5eF8C4501f',
  nftContractAddress: '0x14d489f2D3D7d8017CD2afF5ca0E7b43F0290273',
  waves: [],
  balance: 0,
  totalNFT: 0,
  mintedNFT: 0,
};

type StateType = ReturnType<() => typeof initialState>;

const AppContext = createContext<{ state: StateType; dispatch: Dispatch<any> }>({
  state: initialState,
  dispatch: () => null,
});

// eslint-disable-next-line
function appReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case START_CONNECT_WALLET:
      return {
        ...state,
        loggedIn: true,
      };

    case SET_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };

    case GET_ALL_WAVES:
      return {
        ...state,
        waves: action.payload,
      };

    case UPDATE_ALL_WAVES:
      return {
        ...state,
        waves: [...state.waves, action.payload],
      };

    case START_WAVE_AT_ME:
      return {
        ...state,
        waveLaoding: true,
      };

    case STOP_WAVE_AT_ME:
      return {
        ...state,
        waveLaoding: false,
      };

    case SET_ETH_BALANCE:
      return {
        ...state,
        balance: action.payload,
      };

    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sideBar: !state.sideBar,
      };

    case SET_MINTED_NFT:
      return {
        ...state,
        mintedNFT: action.payload,
      };

    case SET_TOTAL_NFT:
      return {
        ...state,
        totalNFT: action.payload,
      };

    default:
      return state;
  }
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a CountProvider');
  }
  return context;
}

const ContextProvider = (props: IProps) => {
  const { children } = props;
  const [state, dispatch] = useReducer(appReducer, initialState);
  const value = React.useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  );

  const getAllWaves = async () => {
    try {
      const { ethereum }: any = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          state.waveContractAddress,
          contractABI.abi,
          signer,
        );
        const waves = await wavePortalContract.getAllWaves();

        const wavesCleaned: Array<any> = [];
        waves.forEach((wave: any) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });

        const balance = await signer.getBalance();

        // eslint-disable-next-line
        const eth = utils.formatEther(balance._hex);

        dispatch({ type: SET_ETH_BALANCE, payload: Number.parseFloat(eth).toFixed(4) });

        dispatch({ type: GET_ALL_WAVES, payload: wavesCleaned });
      }
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  const getNFTDetails = async () => {
    try {
      const { ethereum }: any = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const NFTPortalContract = new ethers.Contract(
          state.nftContractAddress,
          myEpicNft.abi,
          signer,
        );
        const totalNFT = await NFTPortalContract.getTotalNFTs();
        const mintedNFT = await NFTPortalContract.getTotalNFTsMintedSoFar();

        const balance = await signer.getBalance();

        // eslint-disable-next-line
        const eth = utils.formatEther(balance._hex);

        dispatch({ type: SET_ETH_BALANCE, payload: Number.parseFloat(eth).toFixed(4) });
        dispatch({ type: SET_TOTAL_NFT, payload: totalNFT.toNumber() });
        dispatch({ type: SET_MINTED_NFT, payload: mintedNFT.toNumber() });
      }
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  useEffect(() => {
    if (state.account) {
      getAllWaves();
      getNFTDetails();
    }
  }, [state.account]);

  useEffect(() => {
    let wavePortalContract: any;
    let nftPortalContract: any;

    const { ethereum }: any = window;

    const onNewWave = () => {
      getAllWaves();
      toast.info('New Wave');
    };

    const onNewNFT = (_: any, id: any) => {
      getNFTDetails();

      toast.success(
        <div>
          NFT minted,
          <br />
          <a
            href={`https://testnets.opensea.io/assets/${state.nftContractAddress}/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="pl-2 d-inline"
          >
            View NFT on Opensea
          </a>
        </div>,
        {
          autoClose: false,
          closeOnClick: false,
        },
      );
    };

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      wavePortalContract = new ethers.Contract(state.waveContractAddress, contractABI.abi, signer);
      nftPortalContract = new ethers.Contract(state.nftContractAddress, myEpicNft.abi, signer);
      nftPortalContract.on('NewEpicNFTMinted', onNewNFT);
      wavePortalContract.on('NewWave', onNewWave);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off('NewWave', onNewWave);
      }
      if (nftPortalContract) {
        nftPortalContract.off('NewEpicNFTMinted', onNewNFT);
      }
    };
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default ContextProvider;
