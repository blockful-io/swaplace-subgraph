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
      address: "0xb7A42919ae66745Ffa69940De9d3DD99703eACb1",
      network: "sepolia",
      startBlock: 5484393,
      
    },
  },
});
