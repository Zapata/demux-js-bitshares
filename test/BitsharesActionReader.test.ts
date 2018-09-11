import { BitsharesActionReader } from "../src/BitsharesActionReader"

import * as rawBlock from "./fixtures/raw_block.json"

describe("BitsharesActionReader", () => {
  let request: any
  let reader: BitsharesActionReader

  const blockInfo = {
    last_irreversible_block_num: 28999200,
    head_block_number: 28999264,
  }

  beforeAll(() => {
    request = {
      post: async (requestParams: any) => {
        switch (requestParams.json.method) {
          case "get_dynamic_global_properties": return { result: blockInfo }
          case "get_block": return { result: rawBlock }
          default: return undefined
        }
      }
    }
  })

  beforeEach(() => {
    reader = new BitsharesActionReader("", 1, false, 600, request)
  })

  it("returns last irreversible block if configured", async () => {
    reader = new BitsharesActionReader("", 1, true, 600, request)
    const blockNum = await reader.getHeadBlockNumber()
    expect(blockNum).toBe(28999200)
  })

  it("returns head block if configured", async () => {
    const blockNum = await reader.getHeadBlockNumber()
    expect(blockNum).toBe(28999264)
  })

  it("gets a block", async () => {
    const block = await reader.getBlock(28999264)
    expect(block).toEqual({
      blockInfo: {
        blockHash: "28999264",
        blockNumber: 28999264,
        previousBlockHash: "28999263",
        timestamp: new Date("2018-07-24T08:51:15")
      },
      actions: [
        {
          type: "limit_order_cancel",
          payload: {
            transactionIndex: 0,
            operationIndex: 0,
            operation: {
              extensions: [],
              fee: {
                amount: 57,
                asset_id: "1.3.0",
              },
              fee_paying_account: "1.2.959121",
              order: "1.7.131695145",
            },
            result: {
              type: "asset",
              data: {
                amount: "5006408241",
                asset_id: "1.3.3869",
              },
            },
          },
        },
      ],
    })
  })
})
