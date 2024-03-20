import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { bsc, mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, bsc],
  connectors: [injected()],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
  },
});

export default wagmiConfig;

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
