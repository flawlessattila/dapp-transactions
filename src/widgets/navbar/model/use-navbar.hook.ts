import { useMetaMask } from "metamask-react";
import { useState, useContext, useEffect } from "react";
import TestNetContext from "@lib/context/testnet.context";
import { useConfig } from "wagmi";
import { getBalance } from "wagmi/actions";
import { stringShorter } from "@lib/utils/stringShorter";

type CryptoBalance = {
  name: string,
  balance: string
}

export function useNavbar() {
  const [balance, setBalance] = useState<CryptoBalance[] | []>(
    []
  );
  const [isMenuOpen, toggleMenu] = useState(false);
  const { status, account } = useMetaMask();
  const { testNet, setTestNet } = useContext(TestNetContext);
  const config = useConfig();


  const address = stringShorter(account, 5);


  

  const updateBalance = async () => {
    setBalance([]);
    if (!account) {
      return;
    }

    const chains = config.chains.filter((chain) => {
      if (testNet) {
        return !!chain.testnet;
      }
      if (!testNet) {
        return !chain.testnet;
      }
    });

    const balanceResult = await Promise.all(
      chains.map(async ({ nativeCurrency, id}) => {
        const name = nativeCurrency.symbol;
        const balance = await getBalance(config, {
          address: account as `0x${string}`,
          chainId: id,
        });
        return {name, balance: balance.formatted};
      }),
    );

    setBalance(balanceResult);
  };

  useEffect(() => {
    if (status === "connected") {
      updateBalance();
    }
  }, [status, account, config.chains, testNet]);


  return {address, metaMaskStatus: status, balance, toggleMenu, isMenuOpen, testNet, setTestNet}
}