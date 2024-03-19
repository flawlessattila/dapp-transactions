'use client';

import NextLink from 'next/link';
import { useMetaMask } from 'metamask-react';
import { LinearProgress, Link, Stack, Typography } from '@mui/joy';
import { ConnectButton } from '@ui/ConnectButton';

export function ConnectMetamask() {

  const { status, connect} = useMetaMask();
  
  return (
    <Stack 
      textAlign={{
        xs: 'center',
        md: 'left' 
      }} 
      direction={{
        xs: 'column',
        md: 'row'
      }}
      justifyContent="center" 
      alignItems="center"
    >
      <Stack
        alignItems={{
          xs: 'center',
          md: 'flex-start'
        }}
      >
        <Typography level="h1" mt={5}>
            Start Using
        </Typography>
        <Typography mb={2} level="h1">
          Transactions dApp
        </Typography>

      { status === 'initializing' && <LinearProgress sx={{width:'100%'}} />}

      { (status === 'connecting' || status !== 'initializing' && status !== 'unavailable') 
      ?  <ConnectButton onClick={connect} loading={status === 'connecting'}/> 
      : null}

      { status !== 'initializing' && status == 'unavailable' 
      && <>
        <Typography maxWidth={300} color="neutral">
            To use our application, install the MetaMask extension for your browser.
          </Typography>
          <NextLink target="_blank" href="https://metamask.io/download/">
            <Link component={'span'} variant="plain">
              Install MetaMask Extension
            </Link>
          </NextLink>
        </>}

      </Stack>
      <img 
        style={{
          display: 'block',
          maxWidth: '60%'
        }} 
        src="/static/cosmonaut.svg"
        alt="Cosmonaut"
      />
    </Stack>
  )
}
