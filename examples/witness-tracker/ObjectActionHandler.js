const { AbstractActionHandler } = require("demux")

// Initial state
const state = { 
  witnesses: new Map(), 
  indexState: { 
    blockNumber: 0, 
    blockHash: "" 
  } 
}

class ObjectActionHandler extends AbstractActionHandler {
  async handleWithState(handle) {
    await handle(state)
  }

  async loadIndexState() {
    return state.indexState
  }

  async updateIndexState(stateObj, block) {
    stateObj.indexState.blockNumber = block.blockNumber
    stateObj.indexState.blockHash = block.blockHash
  }
}

module.exports = ObjectActionHandler
