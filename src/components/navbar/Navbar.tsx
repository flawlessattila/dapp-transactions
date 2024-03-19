'use client';
import { appName, appVersion } from '@/app.config';

import React, { useEffect, useState, useContext } from 'react';
import { useMetaMask } from 'metamask-react';

import {
  Typography, Stack, IconButton,
  MenuButton,
  Menu,
  MenuItem,
  ListItemDecorator,
  Dropdown,
  Chip,
  CircularProgress
} from '@mui/joy';

import { useConfig } from 'wagmi';
import { getBalance } from '@wagmi/core'

import { stringShorter } from '@lib/utils/stringShorter';
import TestNetContext from '@lib/context/testnet.context';
import { MobileMenu } from './MobileMenu';
import { Account } from '@ui/user/Account';
import CryptoIcon from '@ui/crypto-icon/CryptoIcon';

import AnimationOutlinedIcon from '@mui/icons-material/AnimationOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CodeOffOutlinedIcon from '@mui/icons-material/CodeOffOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';

const navbarContainerStyles = {
  flexDirection: {
    sm: 'column',
    md: 'row'
  },
  display: { sm: 'flex', },
  zIndex: '999',
  top: 0,
  position: 'sticky',
  width: '100dvw',
  py: 2,
  backgroundColor: 'background.body',
  borderBottom: '1px solid',
  borderColor: 'divider',
}

export default function Navbar() {

  const [balanceChips, setBalanceChips] = useState<React.ReactElement[] | null>([]);
  const [menu, setMenu] = useState(false);
  const {status, account} = useMetaMask();

  const {testNet, setTestNet} = useContext(TestNetContext);
  
  const config = useConfig();


  const updateBalance = async () => {

    setBalanceChips([])
    if (!account) {return}
   
    const chains = config.chains.filter((chain) => {
      if (testNet) {return !!chain.testnet}
      if (!testNet) {return !chain.testnet}
    })

    const chips = await Promise.all(chains.map(async ({nativeCurrency, id, ...other}) => {
      const name = nativeCurrency.symbol;
      const balance = await getBalance(config, {
       address: account as `0x${string}`,
       chainId: id
      })
      return <Chip
      key={name}
      sx={{
        userSelect: 'none'
      }}
      variant="outlined"
      startDecorator={<CryptoIcon
        height="12px"
        width="12px"
        size="s"
        currencySymbol={name} />}
      >
        {name} {balance.formatted}
      </Chip>;
    }))

    setBalanceChips(chips)
  }

  useEffect(() => {
    if (status === 'connected') {
      updateBalance()
    }
  }, [status, account, config.chains, testNet])
  

  const address = stringShorter(account, 5);

  const toggleDrawer = (inOpen: boolean) => {
    setMenu(inOpen);
  };


  return (
    <>
      <MobileMenu open={menu} address={address} chains={balanceChips} onClose={() => toggleDrawer(false)} />
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        gap={1}
        p={2}
        justifyContent="space-between"
        sx={navbarContainerStyles}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Stack>
            <AnimationOutlinedIcon
              color="primary"
              sx={{
                width: 50,
                height: 50
              }} />
          </Stack>
          <Typography
            noWrap={true}
            level="title-lg">
            {appName}
          </Typography>
          <Typography
            alignSelf="flex-end"
            color="neutral"
            noWrap={true}
            level="title-sm">
            v{appVersion}
          </Typography>
        </Stack>
        {status === 'connected' 
        && <>
          <Stack
            alignItems="center"
            justifyContent={{ sm: 'space-between', md: 'flex-end' }}
            direction="row"
            flexGrow={1}
            width={{ sm: 1, md: 'auto' }}
            sx={{
              display: {
                xs: 'none',
                sm: 'flex'
              }
            }}
            gap={2}>
            <Stack
              gap={1}
              direction="row"
              flexWrap="wrap"
              justifyContent={{ sm: 'flex-start', md: 'flex-end' }}>
              {balanceChips && balanceChips?.length > 0 ? balanceChips : <CircularProgress size="sm" color="neutral" variant="plain"/> }
            </Stack>
            <Dropdown>
              <MenuButton variant="plain">
                <Account address={address} />
              </MenuButton>
              <Menu placement="bottom-end">
                <MenuItem onClick={() => {setTestNet((s) => !s)}}>
                  <ListItemDecorator>
                  {testNet ? <CodeOffOutlinedIcon /> : <CodeOutlinedIcon />} 
                  </ListItemDecorator>
                  Switch Testnet
                </MenuItem>
              </Menu>
            </Dropdown>
          </Stack>
          <IconButton
            sx={{
              display: {
                sm: 'none'
              }
            }}
            color="primary"
            onClick={() => toggleDrawer(true)}
          >
            <MenuOutlinedIcon />
          </IconButton> 
        </>}
        
        
      </Stack>
    </>
  );
}
