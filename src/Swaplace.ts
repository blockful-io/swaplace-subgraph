import { ponder } from "@/generated";

ponder.on("Swaplace:SwapCreated", async ({ event, context }) => {
  const { client } = context;
  const { Swaplace } = context.contracts;
  const { Database } = context.db;
  const { swapId, owner, expiry } = event.args;

  const contractResponse = await client.readContract({
    abi: Swaplace.abi,
    address: Swaplace.address,
    functionName: "getSwap",
    args: [event.args.swapId],
  });

  interface Asset {
    addr: string;
    amountOrId: string;
  }

  let biding = contractResponse.biding.map((config) => {
    let asset: Asset = {
      addr: config.addr,
      amountOrId: config.amountOrId.toString(),
    };
    return asset;
  });

  let asking = contractResponse.biding.map((config) => {
    let asset: Asset = {
      addr: config.addr,
      amountOrId: config.amountOrId.toString(),
    };
    return JSON.stringify(asset);
  });

  let strinfiedBid = JSON.stringify(biding);
  let strinfiedAsk = JSON.stringify(asking);

  await Database.create({
    id: `0x${swapId}`,
    data: {
      swapId: swapId,
      status: "CREATED",
      owner: owner,
      allowed: contractResponse.allowed,
      expiry: expiry,
      bid: strinfiedBid,
      ask: strinfiedAsk,
      blockTimestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,
    },
  });
});
