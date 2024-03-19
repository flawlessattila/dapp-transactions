import { Button, FormControl, FormHelperText, FormLabel, Sheet, Input, Snackbar, Stack, ToggleButtonGroup, Typography } from "@mui/joy"
import { useState, useContext, useEffect } from 'react';
import CryptoIcon from "@ui/crypto-icon/CryptoIcon";

import TestNetContext from '@/src/lib/context/testnet.context';
import { useConfig } from "wagmi";
import { useMetaMask } from "metamask-react";
import { getBalance, getConnections } from "wagmi/actions";

import { type GetBalanceReturnType, sendTransaction } from '@wagmi/core'

import { isAddress, isAddressEqual, parseEther } from "viem";
import { useForm, SubmitHandler, Controller } from "react-hook-form"

import { parseFloatInput } from "@lib/utils/parseFloatInput";



const FormSheetStyles = {
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
}

const defaultBalance = {
  current: {
    decimals: 0,
    symbol: '',
    value: BigInt(0),
    formatted: ''
  } as GetBalanceReturnType,
  status: 'loading'
}

const intialValues = {
  amount: "0",
  address: ""
};


export const SendForm = () => {
  const config = useConfig();
  const connections = getConnections(config)

  console.log('formConfig', config)
  console.log('con', connections)

  const {testNet} = useContext(TestNetContext);
  const chains = config.chains.filter((chain) => {
    if (testNet) {return !!chain.testnet}
    if (!testNet) {return !chain.testnet}
  })





  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const { account } = useMetaMask();
  const [balance, setBalance] = useState(defaultBalance);
  const [currency, setCurrency] = useState(chains[0]); 


  const [sendTo, setSendTo] = useState('');
  const [amount, setAmount] = useState('0');


  const handleCurrency = (_: any, newValue: string | null) => {
    if (!newValue) {return}
    chains.forEach((chain) => {
      if (chain.id === +newValue) {
        setCurrency(chain)
      }
    })
  }

  const handleSend = () => {
    sendTransaction(config, {
      connector: connections[0].connector,
      chainId: currency.id,
      to: sendTo as `0x${string}`,
      value: parseEther(amount),
    }).then((result) => {
      console.log(result)
    }).catch((...errors) => {
      // errors[0].cause.name === 'UserRejectedRequestError'
      console.log(errors)
    })
  }

  
  const onSubmit = (data) => {
    console.log(data)
  }

  // function handleInput() {
  //   console.log(arguments)
  // }


 
  useEffect(() => {

    if(window) {
      window.con1 = config
      window.con2 = connections
      window.con3 = getConnections
    }

    setBalance(defaultBalance)
    getBalance(config, {
      address: account as `0x${string}`,
      chainId: currency.id
     }).then((balance) => {
      setBalance({current: balance, status:'available'})
      console.log(balance)
     })

  }, [currency, account])
  
  


  useEffect(() => {
    setCurrency(chains[0])
  }, [testNet, account])


  const availableCurrency = chains.map((chain) => {
    const name = chain.nativeCurrency.symbol
    return <Button 
    key={name}
    sx={{py: 0}}
    startDecorator={ <CryptoIcon height="25px" width="25px" size="m" currencySymbol={name}/>} 
    value={String(chain.id)}>
      {name}
    </Button>
  })


  return (
    <Sheet sx={FormSheetStyles}>
      <Typography mb={3} level="h4">
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
          {availableCurrency}
        </ToggleButtonGroup>       
        <Typography level="title-sm" mt={1}>Available: {balance.status === 'available' ? balance.current.formatted : '...'} {currency.nativeCurrency.symbol}</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack py={2} gap={1}>
          <Controller
            control={control}
            name="amount"
            render={({ field: { onChange, value } }) => {
              const formatted = parseFloatInput(value || '')
              return (
                <FormControl error={!!errors.amount}>
                  <FormLabel>Amount</FormLabel>
                  <Input 
                        type="text"
                        value={formatted}
                        placeholder="0.000001" 
                        onChange={onChange}
                  />
                  {parseFloat(formatted) < 0.000001 && <Typography mt={0.5} level="body-xs" color="danger">min.: 0.000001</Typography>}
                  
                
                </FormControl>
              )
            }}
          />
            
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                defaultValue={intialValues.address} 
                placeholder="0x000000000000..."
                {...register('address', {
                  validate: {
                    notAddress: (value) => isAddress(value),
                    yours: (value) => value === account,
                  }
                })} 
              />
              {errors?.address?.type === 'notAddress' && <Typography mt={0.5} level="body-xs" color="danger">Enter valid recepient address</Typography>}
              {errors?.address?.type === 'yours' && <Typography mt={0.5} level="body-xs" color="danger">The specified address belongs to you</Typography>}
            </FormControl>
          </Stack>
          <Stack
            mt={2}
            direction="row"
          >
              <Button  size="lg" type="submit">Send</Button>
          </Stack>
        </form>
      </Stack>
          
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        variant="solid"
        color="danger"
        autoHideDuration={1500}
        open={true}
      >
        Request Error
      </Snackbar>
     
    </Sheet>
  )
}