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
import { Controller } from "react-hook-form";
import CryptoIcon from "@ui/crypto-icon/CryptoIcon";
import { parseFloatInput } from "@lib/utils/parseFloatInput";

import { useTransfer } from "../model/transfer.hook";
import { isAddress } from "viem/utils";

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

const defaultForm = {
  amount: "",
  address: "",
};

export const TransferForm = () => {
  const {
    account,
    form,
    chains,
    currency,
    switchCurrency,
    balance,
    handleSend,
    sendResult,
    sendResultOnClose
  } = useTransfer();

  if (!account) {
    return;
  }

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
          onChange={switchCurrency}
        >
          {availableCurrency}
        </ToggleButtonGroup>
        <Typography level="title-sm" mt={1}>
          Available:{" "}
          {balance.status === "available" ? balance.current.formatted : "..."}{" "}
          {currency.nativeCurrency.symbol}
        </Typography>
        <form onSubmit={handleSend}>
          <Stack py={2} gap={1}>
            <Controller
              control={form.control}
              name="amount"
              render={({ field: { onChange, value } }) => {
                const formatted = parseFloatInput(value || "");
                return (
                  <FormControl error={!!form.formState.errors.amount}>
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
                {...form.register("address", {
                  validate: {
                    notAddress: (value) => isAddress(value),
                    yours: (value) => +value !== +account,
                  },
                })}
              />
              {form.formState.errors?.address?.type === "notAddress" && (
                <Typography mt={0.5} level="body-xs" color="danger">
                  Enter valid recepient address
                </Typography>
              )}
              {form.formState.errors?.address?.type === "yours" && (
                <Typography mt={0.5} level="body-xs" color="danger">
                  The specified address belongs to you
                </Typography>
              )}
            </FormControl>
          </Stack>
          <Stack mt={2} direction="row">
            {sendResult.status === "idle" && (
              <Button size="lg" type="submit">
                Send
              </Button>
            )}
            {sendResult.status === "loading" && (
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
        color={sendResult.success ? "success" : "danger"}
        autoHideDuration={3000}
        open={sendResult.open}
        onClose={sendResultOnClose}
      >
        {sendResult.message}
      </Snackbar>
    </Sheet>
  );
};
