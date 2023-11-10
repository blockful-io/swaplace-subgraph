import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  SwapAccepted,
  SwapCanceled,
  SwapCreated
} from "../generated/Swaplace/Swaplace"

export function createSwapAcceptedEvent(
  id: BigInt,
  accepter: Address
): SwapAccepted {
  let swapAcceptedEvent = changetype<SwapAccepted>(newMockEvent())

  swapAcceptedEvent.parameters = new Array()

  swapAcceptedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  swapAcceptedEvent.parameters.push(
    new ethereum.EventParam("accepter", ethereum.Value.fromAddress(accepter))
  )

  return swapAcceptedEvent
}

export function createSwapCanceledEvent(
  id: BigInt,
  canceler: Address
): SwapCanceled {
  let swapCanceledEvent = changetype<SwapCanceled>(newMockEvent())

  swapCanceledEvent.parameters = new Array()

  swapCanceledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  swapCanceledEvent.parameters.push(
    new ethereum.EventParam("canceler", ethereum.Value.fromAddress(canceler))
  )

  return swapCanceledEvent
}

export function createSwapCreatedEvent(
  id: BigInt,
  owner: Address,
  expiry: BigInt
): SwapCreated {
  let swapCreatedEvent = changetype<SwapCreated>(newMockEvent())

  swapCreatedEvent.parameters = new Array()

  swapCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  swapCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  swapCreatedEvent.parameters.push(
    new ethereum.EventParam("expiry", ethereum.Value.fromUnsignedBigInt(expiry))
  )

  return swapCreatedEvent
}
