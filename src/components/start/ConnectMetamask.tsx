"use client";

import NextLink from "next/link";
import { useMetaMask } from "metamask-react";
import { LinearProgress, Link, Stack, Typography } from "@mui/joy";
import { ConnectButton } from "@components/start/ConnectButton";

export function ConnectMetamask() {
  const { status } = useMetaMask();

  return (
    <Stack
      textAlign={{
        xs: "center",
        md: "left",
      }}
      direction={{
        xs: "column",
        md: "row",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        alignItems={{
          xs: "center",
          md: "flex-start",
        }}
        pt={5}
      >
        <Typography mb={2} level="body-sm" color="neutral">
          Тестовое задание
        </Typography>
        <Typography level="h1">Start Using</Typography>
        <Typography mb={2} level="h1">
          Transactions dApp
        </Typography>
        <Stack direction="row" gap={2} mb={2} alignItems="center">
          <Typography level="body-md">Тимершин Абдулла</Typography>
          <NextLink href="https://github.com/flawlessattila/dapp-transactions">
            <Link component={"span"} variant="soft">
              GitHub repo
            </Link>
          </NextLink>
        </Stack>

        {status === "initializing" && <LinearProgress sx={{ width: "100%" }} />}

        {status === "connecting" ||
        (status !== "initializing" && status !== "unavailable") ? (
          <ConnectButton loading={status === "connecting"} />
        ) : null}

        {status !== "initializing" && status == "unavailable" && (
          <>
            <Typography maxWidth={300} color="neutral">
              To use our application, install the MetaMask extension for your
              browser.
            </Typography>
            <NextLink target="_blank" href="https://metamask.io/download/">
              <Link component={"span"} variant="plain">
                Install MetaMask Extension
              </Link>
            </NextLink>
          </>
        )}
      </Stack>
      <img
        style={{
          display: "block",
          maxWidth: "60%",
        }}
        src="/static/cosmonaut.svg"
        alt="Cosmonaut"
      />
    </Stack>
  );
}
