"use client";

import { appName, appVersion } from "@/app.config";

import {
  Typography,
  Stack,
  IconButton,
  MenuButton,
  Menu,
  MenuItem,
  ListItemDecorator,
  Dropdown,
  CircularProgress,
  Chip,
} from "@mui/joy";

import { MobileMenu } from "./MobileMenu";
import { Account } from "@/src/shared/ui/user/Account";

import AnimationOutlinedIcon from "@mui/icons-material/AnimationOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CodeOffOutlinedIcon from "@mui/icons-material/CodeOffOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import { useNavbar } from "../model/use-navbar.hook";
import CryptoIcon from "@ui/crypto-icon/CryptoIcon";

const navbarContainerStyles = {
  flexDirection: {
    sm: "column",
    md: "row",
  },
  display: { sm: "flex" },
  zIndex: "999",
  top: 0,
  position: "sticky",
  width: "100dvw",
  py: 2,
  backgroundColor: "background.body",
  borderBottom: "1px solid",
  borderColor: "divider",
};

export function Navbar() {
  const {
    metaMaskStatus,
    address,
    balance,
    isMenuOpen,
    testNet,
    setTestNet,
    toggleMenu,
  } = useNavbar();

  const balanceChips = balance.map((cur) => (
    <Chip
      key={cur.name}
      sx={{
        userSelect: "none",
      }}
      variant="outlined"
      startDecorator={
        <CryptoIcon
          height="12px"
          width="12px"
          size="s"
          currencySymbol={cur.name}
        />
      }
    >
      {cur.name} {cur.balance}
    </Chip>
  ));

  return (
    <>
      <MobileMenu
        open={isMenuOpen}
        address={address}
        chains={balanceChips}
        onClose={() => toggleMenu(false)}
      />
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        gap={1}
        p={2}
        justifyContent="space-between"
        sx={navbarContainerStyles}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Stack>
            <AnimationOutlinedIcon
              color="primary"
              sx={{
                width: 50,
                height: 50,
              }}
            />
          </Stack>
          <Typography noWrap={true} level="title-lg">
            {appName}
          </Typography>
          <Typography
            alignSelf="flex-end"
            color="neutral"
            noWrap={true}
            level="title-sm"
          >
            v{appVersion}
          </Typography>
        </Stack>
        {metaMaskStatus === "connected" && (
          <>
            <Stack
              alignItems="center"
              justifyContent={{ sm: "space-between", md: "flex-end" }}
              direction="row"
              flexGrow={1}
              width={{ sm: 1, md: "auto" }}
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
              }}
              gap={2}
            >
              <Stack
                gap={1}
                direction="row"
                flexWrap="wrap"
                justifyContent={{ sm: "flex-start", md: "flex-end" }}
              >
                {balanceChips && balanceChips?.length > 0 ? (
                  balanceChips
                ) : (
                  <CircularProgress size="sm" color="neutral" variant="plain" />
                )}
              </Stack>
              <Dropdown>
                <MenuButton variant="plain">
                  <Account address={address} />
                </MenuButton>
                <Menu placement="bottom-end">
                  <MenuItem
                    onClick={() => {
                      setTestNet((s) => !s);
                    }}
                  >
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
                  sm: "none",
                },
              }}
              color="primary"
              onClick={() => toggleMenu(true)}
            >
              <MenuOutlinedIcon />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );
}
