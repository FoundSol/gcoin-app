import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";
import { getContractAddresses } from "./lib/wagmi";

export default defineConfig({
  out: "lib/wagmiHooks.ts",
  contracts: [],
  plugins: [
    foundry({
      project: "../gcoin",
      deployments: getContractAddresses(),
    }),
    react(),
  ],
});
