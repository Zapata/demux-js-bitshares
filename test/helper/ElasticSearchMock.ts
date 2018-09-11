import * as blockInfo from "../fixtures/es_block_info.json"
import * as rawBlock from "../fixtures/es_raw_block.json"

export class Client {
  public Client(_config: any) {
  }

  public search(query: any) {
    if ("aggs" in query.body && "max_block_num" in query.body.aggs) {
      return blockInfo
    } else {
      return rawBlock
    }
  }
}
