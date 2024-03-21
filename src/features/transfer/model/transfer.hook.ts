import TestNetContext from "@lib/context/testnet.context";
import { useMetaMask } from "metamask-react";
import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import { useConfig } from "wagmi";
import { connect, getBalance, getConnections } from "wagmi/actions";
import { Chain, parseEther } from "viem";
import { type GetBalanceReturnType, sendTransaction } from "@wagmi/core";
import { injected } from "wagmi/connectors";
import { FieldValues, useForm, UseFormReturn } from "react-hook-form";

type TransferResult = {
  open: boolean;
  success: boolean;
  message: string;
  status: "idle" | "loading";
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
} as TransferResult;

export const useTransfer = (): {
  account: string | null;
  form: UseFormReturn;
  chains: Chain[];
  currency: Chain;
  switchCurrency: (_: any, newValue: string | null) => void;
  balance: {
    current: GetBalanceReturnType;
    status: string;
  };
  handleSend: (
    e?: BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
  sendResult: {
    open: boolean;
    success: boolean;
    message: string;
    status: "idle" | "loading";
  };
  sendResultOnClose: () => void;
} => {
  const config = useConfig();
  const form = useForm();

  const { testNet } = useContext(TestNetContext);
  const chains = config.chains.filter((chain) => {
    if (testNet) {
      return !!chain.testnet;
    }
    if (!testNet) {
      return !chain.testnet;
    }
  });

  const { account, chainId: accountChain } = useMetaMask();

  const [balance, setBalance] = useState(defaultBalance);
  const [currency, setCurrency] = useState(chains[0]);

  const [sendResult, setSendResult] = useState<TransferResult>(defaultResult);

  const switchCurrency = (_: any, newValue: string | null) => {
    if (!newValue) {
      return;
    }
    chains.forEach((chain) => {
      if (chain.id === +newValue) {
        setCurrency(chain);
      }
    });
  };

  const handleSend = async (data: FieldValues) => {
    console.log("[FORM SUBMIT]", data);
    setSendResult({
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

      form.reset();
      setSendResult({
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
        setSendResult({
          open: true,
          success: false,
          message: "User rejected",
          status: "idle",
        });
        return;
      }

      setSendResult({
        open: true,
        success: false,
        message:
          error?.cause?.shortMessage || "Transaction finished with error",
        status: "idle",
      });
    }
  };

  useEffect(() => {
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
    form.reset();
  }, [testNet, account]);

  const sendResultOnClose = () => {
    setSendResult((prevState) => ({ ...prevState, open: false }));
  };

  return {
    account,
    form,
    chains,
    currency,
    switchCurrency,
    balance,
    handleSend: form.handleSubmit(handleSend),
    sendResult,
    sendResultOnClose,
  };
};
