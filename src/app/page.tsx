'use client'

import { useEffect } from 'react'
import NextLink from 'next/link';
import { 
  useAccount, 
  useConnect, 
  useConnectors, 
  useDisconnect, 
  useConfig,
  useAccountEffect,
} from 'wagmi'
import { sepolia, mainnet, bsc } from 'viem/chains'

import { Link, Stack, Typography } from '@mui/joy';

import { SendForm } from '@components/send/SendForm'
import {ConnectMetamask} from '@components/start/ConnectMetamask';
import { useMetaMask } from 'metamask-react';

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

export default function Page() {

  // console.log('render')

  const {status} = useMetaMask()

  // const {isReconnecting, isConnecting, isConnected} = useAccount()
  // const config = useConfig()
  // const { connectors, connect, status, error } = useConnect()
  // const cont = useConnectors()
  // const { disconnect } = useDisconnect()

  // console.log('isConnected', isConnected)

  // console.log('account', account)
  // console.log('connectors', cont, config, status, connectors)
  // console.log('status', status)

  // console.log('sepolia', sepolia)
  // console.log('sepolia', mainnet)
  // console.log('sepolia', bsc)

  // if (!isReconnecting && !isConnecting && isConnected) {
  //   console.log('metamask connected, loading...')
  // } 

  // if ((!isReconnecting || !isConnecting) && !isConnected ) {
  //   console.log('metamask not connected')
  // }


  const connected = status === 'connected'

  return (
    <Stack  sx={appContainerStyles}>

      {/* {account.isConnecting || account.isReconnecting ? <Typography level="h1">SENT SKELETON</Typography> : null} */}

      {connected && <SendForm/>}
      {!connected ? <ConnectMetamask/> : null}
      
      
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


