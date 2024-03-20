import { Button, CircularProgress } from "@mui/joy";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { useConfig, useConnect } from "wagmi";

export const ConnectButton = ({
  loading,
}: {
  loading?: boolean | undefined;
}) => {
  const { connect, status, connectors } = useConnect();

  const handleConnect = async () => {
    console.log("[CONNECTION] proccessing...");
    const connectResult = connect({ connector: connectors[0] });
    console.log("[CONNECTION] result", connectResult);
  };

  return (
    <>
      {status !== "pending" && (
        <Button
          size="lg"
          onClick={handleConnect}
          endDecorator={<LinkOutlinedIcon />}
        >
          Connect MetaMask
        </Button>
      )}
      {status == "pending" && (
        <Button
          size="lg"
          endDecorator={<CircularProgress />}
          sx={{
            userSelect: "none",
            pointerEvents: "fill !important",
            "&:hover": {
              cursor: "not-allowed",
            },
          }}
          disabled
        >
          Connecting
        </Button>
      )}
    </>
  );
};
