import { useState, useContext, useEffect } from "react";
import { useConfig } from "wagmi";
import { useMetaMask } from "metamask-react";
import { useForm, Controller, FieldValues } from "react-hook-form";

import {
  Button,
  FormControl,
  FormLabel,
  Sheet,
  Input,
  Snackbar,
  Stack,
  ToggleButtonGroup,
  CircularProgress,
  Typography,
} from "@mui/joy";
import CryptoIcon from "@ui/crypto-icon/CryptoIcon";

import { isAddress, parseEther } from "viem";
import { type GetBalanceReturnType, sendTransaction } from "@wagmi/core";
import { injected } from "wagmi/connectors";
import { connect, getBalance, getConnections } from "wagmi/actions";

import TestNetContext from "@lib/context/testnet.context";
import { parseFloatInput } from "@lib/utils/parseFloatInput";

const FormSheetStyles = {
  p: 2,
  width: "100%",
  maxWidth: {
    xs: "100%",
    sm: 500,
    md: 600,
  },
  border: {
    xs: "none",
    sm: "1px solid var(--joy-palette-divider)",
  },
  borderColor: "divider",
  borderRadius: "5px",
  backgroundColor: {
    xs: "transparent",
    sm: "var(--Sheet-background)",
  },
};

const defaultBalance = {
  current: {
    decimals: 0,
    symbol: "",
    value: BigInt(0),
    formatted: "",
  } as GetBalanceReturnType,
  status: "loading",
};

const defaultResult = {
  open: false,
  success: false,
  message: "",
  status: "idle",
};

const defaultForm = {
  amount: "",
  address: "",
};

export const SendForm = () => {
  const config = useConfig();
  const connections = getConnections(config);

  const { testNet } = useContext(TestNetContext);
  const chains = config.chains.filter((chain) => {
    if (testNet) {
      return !!chain.testnet;
    }
    if (!testNet) {
      return !chain.testnet;
    }
  });

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { account, chainId: accountChain } = useMetaMask();

  const [balance, setBalance] = useState(defaultBalance);
  const [currency, setCurrency] = useState(chains[0]);

  const [result, setResult] = useState(defaultResult);

  if (!account) {
    return;
  }

  const handleCurrency = (_: any, newValue: string | null) => {
    if (!newValue) {
      return;
    }
    chains.forEach((chain) => {
      if (chain.id === +newValue) {
        setCurrency(chain);
      }
    });
  };

  const onSubmit = async (data: FieldValues) => {
    console.log("[FORM SUBMIT]", data);
    setResult({
      ...defaultResult,
      status: "loading",
    });

    if (!accountChain) {
      throw new Error("[FORM] Account chainId is not available");
    }

    try {
      const connections = getConnections(config);

      if (connections.length === 0) {
        console.log("[CONNECTOR STATUS] CONNECTION NEED");
        const connectResult = await connect(config, { connector: injected() });
        console.log("[CONNECTOR RESULT] CONNECTED", connectResult);
      } else {
        console.log("[CONNECTOR STATUS] OK", connections);
      }

      const connector = connections?.[0]?.connector;

      if (!connector) {
        throw new Error("[CONNECTOR] NOT FOUND");
      }

      if (+accountChain !== currency.id) {
        console.log(
          "[CHAIN ID STATUS] SWITCH NEED",
          `${accountChain} to -> ${currency.id}`,
        );

        const switchResult = await connector?.switchChain?.({
          chainId: currency.id,
        });

        console.log("[CHAIN ID RESULT] SWITCHED", switchResult);
      } else {
        console.log("[CHAIN ID STATUS] OK");
      }

      console.log("[TRANSACTION] START");
      const transactionResult = await sendTransaction(config, {
        connector,
        chainId: currency.id,
        to: data.address as `0x${string}`,
        value: parseEther(data.amount),
      });
      console.log("[TRANSACTION] RESULT:", transactionResult);

      reset();
      setResult({
        open: true,
        success: true,
        message: "Success transaction!",
        status: "idle",
      });
    } catch (error: any) {
      console.log("[TRANSACTION ERROR]");
      console.dir(error);
      console.log(typeof error);

      if (!error) {
        return;
      }

      if (error?.cause?.name === "UserRejectedRequestError") {
        setResult({
          open: true,
          success: false,
          message: "User rejected",
          status: "idle",
        });
        return;
      }

      setResult({
        open: true,
        success: false,
        message:
          error?.cause?.shortMessage || "Transaction finished with error",
        status: "idle",
      });
    }
  };

  useEffect(() => {
    // only for debug
    if (window) {
      const windowObj: Window & {
        dConfig?: any;
        dConnections?: any;
        dGetConnections?: any;
        dParseEther?: any;
      } = window;
      windowObj.dConfig = config;
      windowObj.dConnections = connections;
      windowObj.dGetConnections = getConnections;
      windowObj.dParseEther = parseEther;
    }

    setBalance(defaultBalance);
    getBalance(config, {
      address: account as `0x${string}`,
      chainId: currency.id,
    }).then((balance) => {
      setBalance({ current: balance, status: "available" });
    });
  }, [currency, account]);

  useEffect(() => {
    setCurrency(chains[0]);
    reset();
  }, [testNet, account]);

  const availableCurrency = chains.map((chain) => {
    const name = chain.nativeCurrency.symbol;
    return (
      <Button
        key={name}
        sx={{ py: 0 }}
        startDecorator={
          <CryptoIcon
            height="25px"
            width="25px"
            size="m"
            currencySymbol={name}
          />
        }
        value={String(chain.id)}
      >
        {name}
      </Button>
    );
  });

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
        <Typography level="title-sm" mt={1}>
          Available:{" "}
          {balance.status === "available" ? balance.current.formatted : "..."}{" "}
          {currency.nativeCurrency.symbol}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack py={2} gap={1}>
            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, value } }) => {
                const formatted = parseFloatInput(value || "");
                return (
                  <FormControl error={!!errors.amount}>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      required
                      type="text"
                      value={formatted}
                      placeholder="0.000001"
                      onChange={onChange}
                    />
                    {parseFloat(formatted) < 0.000001 && (
                      <Typography mt={0.5} level="body-xs" color="danger">
                        min.: 0.000001
                      </Typography>
                    )}
                  </FormControl>
                );
              }}
            />

            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                required
                type="text"
                defaultValue={defaultForm.address}
                placeholder="0x000000000000..."
                {...register("address", {
                  validate: {
                    notAddress: (value) => isAddress(value),
                    yours: (value) => +value !== +account,
                  },
                })}
              />
              {errors?.address?.type === "notAddress" && (
                <Typography mt={0.5} level="body-xs" color="danger">
                  Enter valid recepient address
                </Typography>
              )}
              {errors?.address?.type === "yours" && (
                <Typography mt={0.5} level="body-xs" color="danger">
                  The specified address belongs to you
                </Typography>
              )}
            </FormControl>
          </Stack>
          <Stack mt={2} direction="row">
            {result.status === "idle" && (
              <Button size="lg" type="submit">
                Send
              </Button>
            )}
            {result.status === "loading" && (
              <Button endDecorator={<CircularProgress />} size="lg" disabled>
                Proccessing
              </Button>
            )}
          </Stack>
        </form>
      </Stack>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        variant="solid"
        color={result.success ? "success" : "danger"}
        autoHideDuration={3000}
        open={result.open}
        onClose={() => {
          setResult((prevState) => ({ ...prevState, open: false }));
        }}
      >
        {result.message}
      </Snackbar>
    </Sheet>
  );
};
