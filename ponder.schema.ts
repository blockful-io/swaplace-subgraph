import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Status: p.createEnum(["created", "accepted", "canceled"]),
  Database: p.createTable({
    id: p.hex(),
    status: p.enum("Status"),
    allowed: p.hex(),
    owner: p.hex(),
    expiry: p.bigint(),
    bid: p.string(),
    ask: p.string(),
    swapId: p.bigint(),
    blockTimestamp: p.bigint(),
    transactionHash: p.hex(),
  }),
}));
