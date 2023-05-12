import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, sepolia } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const config = configureChains(
  [sepolia],
  [
    alchemyProvider({ apiKey: "pCSDyMOuFkzLuUW3FFxpDkl2OHWB-ndx" }),
    infuraProvider({ apiKey: "dfe878e9f9764f57ad1bb851fe7e5919" }),
    publicProvider(),
  ]
);

export const chains = config.chains;

const { connectors } = getDefaultWallets({
  appName: "Cogito Protocol",
  projectId: "b94729529dfb46397675ba33aa64cb0a",
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: config.publicClient,
});
