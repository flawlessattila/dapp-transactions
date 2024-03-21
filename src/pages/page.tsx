"use client";
import { useMetaMask } from "metamask-react";

import { Stack } from "@mui/joy";

import { TransferForm } from "@/src/features/transfer";
import { Setup } from "@/src/features/setup";

const appContainerStyles = {
  flexGrow: 1,
  justifyContent: {
    xs: "flex-start",
    sm: "center",
  },
  alignItems: "center",
  padding: {
    xs: 0,
    sm: 2,
  },
};

export function Page() {
  const { status } = useMetaMask();
  const connected = status === "connected";

  return (
    <Stack sx={appContainerStyles}>
      {connected && <TransferForm />}
      {!connected ? <Setup /> : null}
    </Stack>
  );
}
