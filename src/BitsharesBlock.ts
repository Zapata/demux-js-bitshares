import { Block, BlockInfo } from "demux"
import { OperationType, OperationResultType, BitsharesAction } from "./interfaces"

export class BitsharesBlock implements Block {
  public actions: BitsharesAction[]
  public blockInfo: BlockInfo
  constructor(blockNum: number, rawBlock: any) {
    this.actions = this.collectActionsFromBlock(rawBlock)
    this.blockInfo = {
      blockNumber: blockNum,
      blockHash: blockNum.toString(),
      previousBlockHash: this.hashToBlockNum(rawBlock.previous).toString(),
      timestamp: new Date(rawBlock.timestamp),
    }
  }

  protected hashToBlockNum(hash: string) {
    return parseInt("0x" + hash.slice(0, 8))
  }

  protected collectActionsFromBlock(rawBlock: any): BitsharesAction[] {
    return this.flattenArray(rawBlock.transactions.map((transaction: any, transactionId: number) => {
      return transaction.operations.map((operation: any, operationIndex: number) => {
        const operationResult = transaction.operation_results[operationIndex]
        return {
          type: OperationType[operation[0]],
          payload: {
            transactionIndex: transactionId,
            operationIndex: operationIndex,
            operation: operation[1],
            result: {
              type: OperationResultType[operationResult[0]],
              data: operationResult[1]
            }
          },
        }
      })
    }))
  }

  private flattenArray(arr: any[]): any[] {
    return arr.reduce((flat, toFlatten) =>
      flat.concat(Array.isArray(toFlatten) ? this.flattenArray(toFlatten) : toFlatten), [])
  }
}
