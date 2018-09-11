import { AbstractActionReader } from "demux"
import { Client, ConfigOptions } from "elasticsearch"
import { BitsharesElasticSearchBlock } from "./BitsharesElasticSearchBlock"

/**
 * Reads from a Bitshares ElasticSearch node to get blocks of operations.
 * Virtual operations will be available.
 */
export class BitsharesElasticSearchActionReader extends AbstractActionReader {
  protected elasticSearchClient: Client
  constructor(
    protected elasticSearchConfig: ConfigOptions = {},
    public startAtBlock: number = 1,
    protected onlyIrreversible: boolean = false,
    protected maxHistoryLength: number = 600,
  ) {
    super(startAtBlock, onlyIrreversible, maxHistoryLength)
    this.elasticSearchClient = new Client(elasticSearchConfig)
  }

  /**
   * Returns a promise for the head block number.
   */
  public async getHeadBlockNumber(): Promise<number> {
    if (this.onlyIrreversible) {
      throw new Error("Not implemented yet")
    }
    const response = await this.elasticSearchClient.search({
      index: "bitshares-*",
      type: "data",
      body: {
        size: 0,
        aggs: {
          max_block_num: { max: { field: "block_data.block_num" } }
        }
      }
    })
    return response.aggregations.max_block_num.value
  }

  /**
   * Returns a promise for a `BitsharesBlock`.
   */
  public async getBlock(blockNumber: number): Promise<BitsharesElasticSearchBlock> {
    const response = await this.elasticSearchClient.search({
      index: "bitshares-*",
      type: "data",
      body: {
        size: 10000, // Max operations per block.
        sort: [
          { "operation_history.trx_in_block": "asc" },
          { "operation_history.op_in_trx": "asc" }
        ],
        query: {
          term: {"block_data.block_num": blockNumber }
        },
        "_source": ["operation_history", "operation_type", "block_data"]
      }
    })

    const block = new BitsharesElasticSearchBlock(response.hits.hits)
    return block
  }
}
