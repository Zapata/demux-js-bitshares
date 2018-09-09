import { BitsharesBlock } from "../src/BitsharesBlock"
import * as rawBlock from "./fixtures/raw_blocks.json"

describe("BitsharesBlock", () => {
  let btsBlock: BitsharesBlock

  beforeEach(() => {
    btsBlock = new BitsharesBlock(28999264, rawBlock)
  })

  it("collects actions from blocks", async () => {
    const { actions } = btsBlock
    expect(actions).toEqual([
      {
        "type": "limit_order_cancel",
        "payload": {
          "transactionIndex": 0,
          "operationIndex": 0,
          "operation": {
            "fee": {
              "amount": 57,
              "asset_id": "1.3.0"
            },
            "fee_paying_account": "1.2.959121",
            "order": "1.7.131695145",
            "extensions": []
          },
          "result": {
            "type": "asset",
            "data": {
              "amount": "5006408241",
              "asset_id": "1.3.3869"
            },
          },
        },
      },
      {
        "payload": {
          "transactionIndex": 1,
          "operationIndex": 0,
          "operation": {
            "amount_to_sell": {
              "amount": 1983,
              "asset_id": "1.3.0"
            },
            "expiration": "2018-07-24T08:51:42",
            "fee": {
              "amount": 578,
              "asset_id": "1.3.0"
            },
            "fill_or_kill": false,
            "min_to_receive": {
              "amount": "718409576261824",
              "asset_id": "1.3.100"
            },
            "seller": "1.2.1017154",
            "extensions": []
          },
          "result": {
            "data": "1.7.131695953",
            "type": "object_id_type"
          },
        },
        "type": "limit_order_create"
      },
      {
        "type": "limit_order_create",
        "payload": {
          "transactionIndex": 1,
          "operationIndex": 1,
          "operation": {
            "amount_to_sell": {
              "amount": 952,
              "asset_id": "1.3.0"
            },
            "expiration": "2018-07-24T08:51:42",
            "extensions": [],
            "fee": {
              "amount": 578,
              "asset_id": "1.3.0"
            },
            "fill_or_kill": false,
            "min_to_receive": {
              "amount": "753609593139927",
              "asset_id": "1.3.101"
            },
            "seller": "1.2.1017154"
          },
          "result": {
            "data": "1.7.131695954",
            "type": "object_id_type"
          },
        },
      },
      {
        "type": "limit_order_create",
        "payload": {
          "transactionIndex": 1,
          "operationIndex": 2,
          "operation": {
            "amount_to_sell": {
              "amount": 1599,
              "asset_id": "1.3.0"
            },
            "expiration": "2018-07-24T08:51:42",
            "extensions": [],
            "fee": {
              "amount": 578,
              "asset_id": "1.3.0"
            },
            "fill_or_kill": false,
            "min_to_receive": {
              "amount": "859553061985962",
              "asset_id": "1.3.102"
            },
            "seller": "1.2.1017154"
          },
          "result": {
            "data": "1.7.131695955",
            "type": "object_id_type"
          },
        },
      },
      {
        "type": "witness_create",
        "payload": {
          "transactionIndex": 2,
          "operationIndex": 0,
          "operation": {
            "block_signing_key": "BTS7xgNpgGXwpdozRVZaSAv8wP8Wknz3TjFjojgmXfvfts2YbSF9v",
            "fee": {
              "amount": 28945924,
              "asset_id": "1.3.0"
            },
            "url": "TBD",
            "witness_account": "1.2.987999"
          },
          "result": {
            "data": "1.6.129",
            "type": "object_id_type"
          },
        },
      }
    ])
  })
})
