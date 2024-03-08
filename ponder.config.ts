import { createConfig } from "@ponder/core";
import { http } from "viem";

import { SwaplaceAbi } from "./abis/SwaplaceAbi";

export default createConfig({
  networks: {
    sepolia: {
      chainId: 11155111,
      transport: http(process.env.ALCHEMY_RPC_URL),
    },
  },
  contracts: {
    Swaplace: {
      abi: SwaplaceAbi,
      address: "0xEa78A683B7B97d31Aad8De99881289FC874924b4",
      network: "sepolia",
      startBlock: 5437261,
      
    },
  },
});
