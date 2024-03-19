'use client';
import { useContext } from 'react';

import {
  Stack,
  Drawer,
  ListItemDecorator,
  List, ListItemContent,
  ListItem, ListItemButton
} from '@mui/joy';

import { Account } from '@ui/user/Account';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import CodeOffOutlinedIcon from '@mui/icons-material/CodeOffOutlined';

import TestNetContext from '@lib/context/testnet.context';


export function MobileMenu({ open, address, chains, onClose }: {
  open: boolean; address: string; chains: React.ReactNode; onClose: () => void;
}) {
  const {testNet, setTestNet} = useContext(TestNetContext)

  console.log('mobile menu render', testNet)

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
          <Account address={address} />
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {chains}
          </Stack>
        </Stack>
        <List>
          <ListItem>
            <ListItemButton onClick={() => {setTestNet((s) => !s)}}>
              <ListItemDecorator>{testNet ? <CodeOffOutlinedIcon /> : <CodeOutlinedIcon />} </ListItemDecorator>
              <ListItemContent>Switch Testnet</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Stack>
    </Drawer>
  );
}
