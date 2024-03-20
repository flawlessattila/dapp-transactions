"use client";

import { colorSchemes } from "@/app.config";
import wagmiConfig from "@/wagmi.config";

import { useState } from "react";
import { useLocalStorage } from "@lib/hooks/local-storage.hook";

import { MetaMaskProvider } from "metamask-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type State, WagmiProvider } from "wagmi";
import { CssBaseline, extendTheme, CssVarsProvider } from "@mui/joy";

import TestNetContext from "@lib/context/testnet.context";

const customTheme = extendTheme(colorSchemes);

type Props = {
  children: React.ReactNode;
  initialState: State | undefined;
};

export function Providers({ children, initialState }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  const [testNet, setTestNet] = useLocalStorage("mm_testnet", false);

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <TestNetContext.Provider value={{ testNet, setTestNet }}>
        <MetaMaskProvider>
          <QueryClientProvider client={queryClient}>
            <CssVarsProvider theme={customTheme}>
              <CssBaseline />
              {children}
            </CssVarsProvider>
          </QueryClientProvider>
        </MetaMaskProvider>
      </TestNetContext.Provider>
    </WagmiProvider>
  );
}
