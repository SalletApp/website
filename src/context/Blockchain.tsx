// @ts-nocheck
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const BlockchainContext = createContext({
  kovanProvider: () => null,
  laChainProvider: () => null,
  getGasPrice: () => null,
});

export function BlockchainWrapper({ children }) {
  const [kovanProvider, setKovanProvider] = useState();
  const [laChainProvider, setLaChainProvider] = useState();

  const networkLaChain = {
    name: 'LaTestnet',
    chainId: 418,
  };

  useEffect(() => {
    if (!kovanProvider) {
      // Mainnet: homestead
      // Testnet: goerli
      const kovan = new ethers.providers.InfuraProvider('goerli', process.env.INFURA_TOKEN_API);
      const laChain = new ethers.providers.JsonRpcProvider('https://rpc.testnet.lachain.network', networkLaChain);

      setKovanProvider(kovan);
      setLaChainProvider(laChain);
    }
  }, [kovanProvider]);

  if (!kovanProvider) return;

  // Obtener precio del gas
  const getGasPrice = async () => {
    const gasPrice = await laChainProvider.getGasPrice();
    return ethers.utils.formatEther(gasPrice);
  };

  return (
    <BlockchainContext.Provider value={{ kovanProvider, getGasPrice, laChainProvider }}>
      {children}
    </BlockchainContext.Provider>
  );
}

export function useBlockchain() {
  return useContext(BlockchainContext);
}
