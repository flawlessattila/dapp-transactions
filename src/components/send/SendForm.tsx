import { Button, Input, Sheet, Stack, ToggleButtonGroup, Typography } from "@mui/joy"
import { useState, useContext, useEffect } from 'react';
import CryptoIcon from "@ui/crypto-icon/CryptoIcon";

import TestNetContext from '@/src/lib/context/testnet.context';
import { useConfig } from "wagmi";
import { useMetaMask } from "metamask-react";
import { getBalance } from "wagmi/actions";

import { type GetBalanceReturnType } from '@wagmi/core'

const defaultBalance = [
  {
    decimals: 0,
    symbol: '',
    value: BigInt(0),
    formatted: ''
  } as GetBalanceReturnType,
  'loading'
]

export const SendForm = () => {
  const config = useConfig();
  const {testNet} = useContext(TestNetContext);
  const chains = config.chains.filter((chain) => {
    if (testNet) {return !!chain.testnet}
    if (!testNet) {return !chain.testnet}
  })


  const { account } = useMetaMask();
  const [balance, setBalance] = useState(defaultBalance);
  const [currency, setCurrency] = useState(chains[0]); 
  // const [sendTo, setSendTo] = useState('');


  const handleCurrency = (_: any, newValue: string | null) => {
    if (!newValue) {return}
    chains.forEach((chain) => {
      if (chain.id === +newValue) {
        setCurrency(chain)
      }
    })
  }

  const handleSend = () => {

  }

  useEffect(() => {
    setBalance(defaultBalance)
    getBalance(config, {
      address: account as `0x${string}`,
      chainId: currency.id
     }).then((balance) => {
      setBalance([balance, 'available'])
     })
  }, [currency])
  
  


  useEffect(() => {
    setCurrency(chains[0])
  }, [testNet, account])





  return (
    <Sheet
      sx={{
        p: 2,
        width: '100%',
        maxWidth: {
          xs: '100%',
          sm: 500,
          md: 600
        },
        border: {
          xs: 'none',
          sm: '1px solid var(--joy-palette-divider)'
        },
        borderColor: 'divider',
        borderRadius: '5px',
        backgroundColor: {
          xs: 'transparent',
          sm: 'var(--Sheet-background)'
        }
      }}>
      <Typography
        mb={3}
        level="h4">
        Send
      </Typography>
      
      <Stack>
        <ToggleButtonGroup
          color="neutral"
          spacing={1}
          variant="outlined"
          value={String(currency.id)}
          onChange={handleCurrency}
        > 
            {chains.map((chain) => {
              const name = chain.nativeCurrency.symbol
              return <Button 
              key={name}
              sx={{py: 0}}
              startDecorator={ <CryptoIcon height="25px" width="25px" size="m" currencySymbol={name}/>} 
              value={String(chain.id)}>
                {name}
              </Button>
            })}
        </ToggleButtonGroup>
        <Typography
        mt={1}
        mb={2}
        level="title-sm">
          Available: {balance[1] === 'available' ? balance[0].formatted : '...'} {currency.nativeCurrency.symbol}
        </Typography>
        <Input
        size="lg"
          variant="outlined"/>
        <Stack
        mt={2}
        direction="row">
            <Button  size="lg" onClick={handleSend}>Send</Button>
        </Stack>
      </Stack>
          
        
     
    </Sheet>
  )
}