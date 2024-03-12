import { ponder } from "@/generated";

ponder.on("Swaplace:SwapCreated", async ({ event, context }) => {
  const { client } = context;
  const { Swaplace } = context.contracts;
  const { Database } = context.db;
  const { swapId, owner } = event.args;

  const contractResponse = await client.readContract({
    abi: Swaplace.abi,
    address: Swaplace.address,
    functionName: "getSwap",
    args: [event.args.swapId],
  });

  let config = contractResponse.config;

  const expiry: bigint = BigInt(config) & ((BigInt(1) << BigInt(96)) - BigInt(1));
  const allowed: any = BigInt(config) >> BigInt(96);
  config = (allowed << BigInt(96)) | BigInt(expiry);

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
    return asset;
  });

  let strinfiedBid = JSON.stringify(biding);
  let strinfiedAsk = JSON.stringify(asking);

  await Database.create({
    id: `0x${swapId}`,
    data: {
      swapId: swapId,
      status: "created",
      owner: owner,
      allowed: allowed,
      expiry: expiry,
      bid: strinfiedBid,
      ask: strinfiedAsk,
      blockTimestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,
    },
  });
});

ponder.on("Swaplace:SwapCanceled", async ({ event, context }) => {
  const { Database } = context.db;
  const { swapId, owner } = event.args;
  const { client } = context;
  const { Swaplace } = context.contracts;

  const contractResponse = await client.readContract({
    abi: Swaplace.abi,
    address: Swaplace.address,
    functionName: "getSwap",
    args: [event.args.swapId],
  });

  let config = contractResponse.config;

  const expiry: bigint = BigInt(config) & ((BigInt(1) << BigInt(96)) - BigInt(1));
  const allowed: any = BigInt(config) >> BigInt(96);
  config = (allowed << BigInt(96)) | BigInt(expiry);

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
    return asset;
  });

  let strinfiedBid = JSON.stringify(biding);
  let strinfiedAsk = JSON.stringify(asking);

  await Database.upsert({
     id: `0x${swapId}`,
     create: {
      swapId: swapId,
      status: "created",
      owner: owner,
      allowed: allowed,
      expiry: expiry,
      bid: strinfiedBid,
      ask: strinfiedAsk,
      blockTimestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,
     },
     update: {
      status: "canceled",
    
    },
  });
});

ponder.on("Swaplace:SwapAccepted", async ({ event, context }) => {

  const { Database } = context.db;
  const { swapId } = event.args;

  await Database.update({
    id: `0x${swapId}`,
    data: {
      status: "accepted",
    },
  });
});