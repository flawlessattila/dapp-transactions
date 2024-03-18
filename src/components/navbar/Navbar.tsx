'use client';

import { useState } from 'react';

import {appName} from '@/app.config';

import { Typography, 
  Button, 
  Stack, 
  Drawer, 
  IconButton,
  MenuButton,
  Menu,
  MenuItem,
  ListItemDecorator,
  ListDivider,
  Dropdown,
  Chip, List, ListItemContent,
  ListItem, ListItemButton
} from '@mui/joy';

import { ThemeToggle } from '@ui/ThemeToggle';
import AnimationOutlinedIcon from '@mui/icons-material/AnimationOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { ConnectButton } from '@ui/ConnectButton';
import { Account } from '@ui/user/Account';

import { stringShorter } from '@lib/utils/stringShorter';

import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CryptoIcon from '@ui/crypto-icon/CryptoIcon';

export default function Navbar() {
  const [menu, setMenu] = useState(false)

  const address = stringShorter('0x4fcFf2C14dA4F9bEC631669A6305ea2fC1Cd6baC', 5);

  const toggleDrawer = (inOpen: boolean) => {
    setMenu(inOpen);
  };

  const chains = [{
    name: "ETH",
    balance: '0.0000001'
  },
  {
    name: "",
    balance: '0.1'
  },
  {
    name: "BNB",
    balance: '0.00000000001'
  }, {
    name: "SEP",
    balance: '0.00324234'
  }];

  const chainsChips = chains.map((chain) => {
          return <Chip 
                  key={chain.name}
                  sx={{
                    userSelect: 'none'
                  }}
                  variant="outlined"
                  startDecorator={
                    <CryptoIcon 
                      height="12px" 
                      width="12px" 
                      size="s" 
                      currencySymbol={chain.name} />
                  }>
                    {chain.name} {chain.balance}
                </Chip>
  })

  return (
    <>
    <MobileMenu open={menu} address={address} chains={chainsChips} onClose={() => toggleDrawer(false)}/>
    <Stack
    direction="row"
    alignItems="center"
    spacing={2}
    gap={1}
    p={2}
    justifyContent="space-between"
    sx={{
        flexDirection: {
          sm: 'column',
          md: 'row'
        },
        display: { sm: 'flex',},
        zIndex: '999',
        top: 0,
        position: 'sticky',
        width: '100dvw',
        py: 2,
        backgroundColor: 'background.body',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}>
        <Stack >
          <AnimationOutlinedIcon
            color="primary"
            sx={{
              width: 50,
              height: 50
            }}
          />
        </Stack>
        <Typography
          noWrap={true}
          level="title-lg" >
          {appName}
        </Typography>
      </Stack>
      {/* <Stack 
      alignItems="center"
      justifyContent={{sm: 'space-between', md: 'flex-end'}}
      direction="row" 
      flexGrow={1}
      width={{sm: 1, md: 'auto'}}
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
       justifyContent={{sm: 'flex-start', md: 'flex-end'}}>
          {chainsChips}
        </Stack>
        <Dropdown>
            <MenuButton variant="plain">
              <Account address={address}/>
            </MenuButton>
          <Menu placement="bottom-end">
            <MenuItem>
              <ListItemDecorator>
                <CodeOutlinedIcon/>
              </ListItemDecorator>
              Switch Testnet
            </MenuItem>
            <ListDivider />
            <MenuItem color="danger">
              <ListItemDecorator>
                <LogoutOutlinedIcon/>
              </ListItemDecorator>
              Log out
            </MenuItem>
          </Menu>
        </Dropdown>
      </Stack> */}
      <IconButton 
        sx={{
          display: {
            sm: 'none'
          }
        }} 
        color="primary" 
        onClick={() => toggleDrawer(true)}
      >
          <MenuOutlinedIcon/>
      </IconButton>
    </Stack>
    </>
  )
}

function MobileMenu({open, address, chains, onClose} : {
  open: boolean, address: string, chains: React.ReactNode, onClose: () => void
}) {
  return (
    <Drawer 
    sx={{
      display: {
        xs: 'block',
        sm: 'none'
      }
    }} open={open} onClose={onClose}>
      <Stack p={2} gap={2}>
        <Stack gap={1}>
          <Account address={address}/>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {chains}
          </Stack>
        </Stack>
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator><CodeOutlinedIcon/></ListItemDecorator>
              <ListItemContent>  Switch Testnet</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton color="danger">
              <ListItemDecorator><LogoutOutlinedIcon/></ListItemDecorator>
              <ListItemContent> Log out</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Stack>
    </Drawer>
  )
}

//  <ConnectButton/> 
//  <ThemeToggle/> 