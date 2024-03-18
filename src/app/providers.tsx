'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { type State, WagmiProvider } from 'wagmi'
import { CssBaseline, extendTheme, CssVarsProvider} from '@mui/joy';
import { colorSchemes } from '@/app.config';

import wagmiConfig from './wagmi.config';


const customTheme = extendTheme(colorSchemes);

type Props = {
  children: React.ReactNode,
  initialState: State | undefined, 
}


export function Providers({children, initialState} : Props) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <CssVarsProvider theme={customTheme}>
          <CssBaseline/>
          {children}
        </CssVarsProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
