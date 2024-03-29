import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { SwapAccepted } from "../generated/schema"
import { SwapAccepted as SwapAcceptedEvent } from "../generated/Swaplace/Swaplace"
import { handleSwapAccepted } from "../src/swaplace"
import { createSwapAcceptedEvent } from "./swaplace-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let swapId = BigInt.fromI32(234)
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let allowed = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newSwapAcceptedEvent = createSwapAcceptedEvent(swapId, owner, allowed)
    handleSwapAccepted(newSwapAcceptedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("SwapAccepted created and stored", () => {
    assert.entityCount("SwapAccepted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SwapAccepted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "swapId",
      "234"
    )
    assert.fieldEquals(
      "SwapAccepted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SwapAccepted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "allowed",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
