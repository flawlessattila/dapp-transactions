'use client'
import { useMetaMask } from 'metamask-react';

import { Stack } from '@mui/joy';

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

export default function Page() {

  const {status} = useMetaMask()
  const connected = status === 'connected'

  return (
    <Stack  sx={appContainerStyles}>
      {connected && <SendForm/>}
      {!connected ? <ConnectMetamask/> : null}
    </Stack>
  )
}


