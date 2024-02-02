import {
  SwapAccepted as SwapAcceptedEvent,
  SwapCanceled as SwapCanceledEvent,
  SwapCreated as SwapCreatedEvent
} from "../generated/Swaplace/Swaplace"
import { SwapAccepted, SwapCanceled, SwapCreated } from "../generated/schema"

export function handleSwapAccepted(event: SwapAcceptedEvent): void {
  let entity = new SwapAccepted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.swapId = event.params.swapId
  entity.owner = event.params.owner
  entity.allowed = event.params.allowed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSwapCanceled(event: SwapCanceledEvent): void {
  let entity = new SwapCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.swapId = event.params.swapId
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSwapCreated(event: SwapCreatedEvent): void {
  let entity = new SwapCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.swapId = event.params.swapId
  entity.owner = event.params.owner
  entity.allowed = event.params.allowed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
