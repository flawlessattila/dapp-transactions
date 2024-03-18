'use client'

import { useEffect } from 'react'
import NextLink from 'next/link';
import { 
  useAccount, 
  useConnect, 
  useConnectors, 
  useDisconnect, 
  useConfig 
} from 'wagmi'
import { sepolia, mainnet, bsc } from 'viem/chains'

import { Link, Stack, Typography } from '@mui/joy';

import { SendForm } from '@components/send/SendForm'
import {ConnectMetamask} from '@components/start/ConnectMetamask';

const appContainerStyles = {
  flexGrow: 1,
  justifyContent: {
    xs: 'flex-start',
    sm: 'center',
  },
  alignItems: 'center',
  padding: {
    xs: 0,
    sm: 2
  }
}

function App() {

  const account = useAccount()
  const config = useConfig()
  const { connectors, connect, status, error } = useConnect()
  const cont = useConnectors()
  const { disconnect } = useDisconnect()

  // console.log('account', account)
  // console.log('connectors', cont, config, status, connectors)
  // console.log('status', status)

  // console.log('sepolia', sepolia)
  // console.log('sepolia', mainnet)
  // console.log('sepolia', bsc)

  console.log('status', !account.isReconnecting, !account.isConnecting, !account.isConnected)
  console.log('status', !(account.isReconnecting || account.isConnecting) && !account.isConnected)
  return (
    <Stack  sx={appContainerStyles}>

      {account.isConnecting || account.isReconnecting ? <Typography level="h1">SENT SKELETON</Typography> : null}

      {!account.isReconnecting && !account.isConnecting && account.isConnected && <SendForm/>}
      {(!account.isReconnecting || !account.isConnecting) && !account.isConnected && <ConnectMetamask/>}
      
      
      {/* <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div> */}
    </Stack>
  )
}

export default App
