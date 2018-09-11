import { BitsharesElasticSearchBlock } from "../src/BitsharesElasticSearchBlock"
import * as rawBlock from "./fixtures/es_raw_block.json"

describe("BitsharesElasticSearchBlock", () => {
  let btsBlock: BitsharesElasticSearchBlock

  beforeEach(() => {
    btsBlock = new BitsharesElasticSearchBlock((rawBlock as any).hits.hits)
  })

  it("collects actions from blocks", async () => {
    const { actions } = btsBlock
    expect(actions).toEqual([
      {
        "type": "limit_order_create",
        "payload": {
          "transactionIndex": 0,
          "operationIndex": 0,
          "operation": {
            "fee": {
              "amount": 100,
              "asset_id": "1.3.0"
            },
            "seller": "1.2.22874",
            "amount_to_sell": {
              "amount": 34457575,
              "asset_id": "1.3.0"
            },
            "min_to_receive": {
              "amount": "7881155494",
              "asset_id": "1.3.1084"
            },
            "expiration": "2023-09-09T08:05:57",
            "fill_or_kill": false,
            "extensions": []
          },
          "result": {
            "type": "object_id_type",
            "data": "1.7.201401"
          },
        },
      },
      {
        "type": "limit_order_create",
        "payload": {
          "transactionIndex": 1,
          "operationIndex": 1,
          "operation": {
            "fee": {
              "amount": 0,
              "asset_id": "1.3.0"
            },
            "seller": "1.2.3564",
            "amount_to_sell": {
              "amount": 100000,
              "asset_id": "1.3.329"
            },
            "min_to_receive": {
              "amount": 1,
              "asset_id": "1.3.330"
            },
            "expiration": "1969-12-31T23:59:59",
            "fill_or_kill": false,
            "extensions": []
          },
          "result": {
            "type": "void_result",
            "data": {
            }
          }
        }
      }
    ])
  })
})
