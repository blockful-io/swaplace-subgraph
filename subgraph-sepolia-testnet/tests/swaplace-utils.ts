import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  SwapAccepted,
  SwapCanceled,
  SwapCreated
} from "../generated/Swaplace/Swaplace"

export function createSwapAcceptedEvent(
  swapId: BigInt,
  owner: Address,
  allowed: Address
): SwapAccepted {
  let swapAcceptedEvent = changetype<SwapAccepted>(newMockEvent())

  swapAcceptedEvent.parameters = new Array()

  swapAcceptedEvent.parameters.push(
    new ethereum.EventParam("swapId", ethereum.Value.fromUnsignedBigInt(swapId))
  )
  swapAcceptedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  swapAcceptedEvent.parameters.push(
    new ethereum.EventParam("allowed", ethereum.Value.fromAddress(allowed))
  )

  return swapAcceptedEvent
}

export function createSwapCanceledEvent(
  swapId: BigInt,
  owner: Address
): SwapCanceled {
  let swapCanceledEvent = changetype<SwapCanceled>(newMockEvent())

  swapCanceledEvent.parameters = new Array()

  swapCanceledEvent.parameters.push(
    new ethereum.EventParam("swapId", ethereum.Value.fromUnsignedBigInt(swapId))
  )
  swapCanceledEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return swapCanceledEvent
}

export function createSwapCreatedEvent(
  swapId: BigInt,
  owner: Address,
  allowed: Address
): SwapCreated {
  let swapCreatedEvent = changetype<SwapCreated>(newMockEvent())

  swapCreatedEvent.parameters = new Array()

  swapCreatedEvent.parameters.push(
    new ethereum.EventParam("swapId", ethereum.Value.fromUnsignedBigInt(swapId))
  )
  swapCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  swapCreatedEvent.parameters.push(
    new ethereum.EventParam("allowed", ethereum.Value.fromAddress(allowed))
  )

  return swapCreatedEvent
}
