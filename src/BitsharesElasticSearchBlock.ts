import { Block, BlockInfo } from "demux"
import { BitsharesAction, OperationResultType, OperationType } from "./interfaces"

export class BitsharesElasticSearchBlock implements Block {
  public actions: BitsharesAction[]
  public blockInfo: BlockInfo
  constructor(rawBlock: any) {
    this.actions = this.collectActionsFromBlock(rawBlock)
    const blockData = rawBlock[0]._source.block_data
    const blockNum = blockData.block_num
    this.blockInfo = {
      blockNumber: blockNum,
      blockHash: blockNum.toString(),
      previousBlockHash: (blockNum - 1).toString(),
      timestamp: new Date(blockData.block_time),
    }
  }

  protected collectActionsFromBlock(rawBlock: any): BitsharesAction[] {
    return rawBlock.map((hit: any) => {
      const source = hit._source
      const operation = JSON.parse(source.operation_history.op)
      const operationResult = JSON.parse(source.operation_history.operation_result)
      return {
        type: OperationType[source.operation_type],
        payload: {
          transactionIndex: source.operation_history.trx_in_block,
          operationIndex: source.operation_history.op_in_trx,
          operation: operation[1],
          result: {
            type: OperationResultType[operationResult[0]],
            data: operationResult[1]
          }
        },
      }
    })
  }
}
