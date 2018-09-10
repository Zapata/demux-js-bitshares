# demux-js-bitshares

Demux BitShares is a [Demux](https://github.com/EOSIO/demux-js) plugin for sourcing Bitshares blockchain events to deterministically update queryable datastores and trigger side effects.

## Overview

The implementation will use BitShares [get_block](http://docs.bitshares.org/api/database.html#_CPPv2NK8graphene3app12database_api9get_blockE8uint32_t) API to retrieve blocks one by one from the a BitShares core API node.
Using this approach virtual operations like `fill_order` are not available, and synchronization time is very long.

To avoid those issues, further versions will retrieve data from ElasticSearch, this requires a node with [ElasticSearch Bitshares plugin](https://github.com/bitshares/bitshares-core/wiki/ElasticSearch-Plugin) activated.


## Installation

```bash
# Using yarn
yarn add demux-bitshares

# Using npm
npm install demux-bitshares --save
```

## Example

```js
// Let's read from a BitShares core node
const { BitsharesActionReader } = require("demux-bitshares")

// Assuming you've created your own subclass of AbstractActionHandler
const MyActionHandler = require("./MyActionHandler")

// Ties everything together in a polling loop
const  { BaseActionWatcher } = require("demux")

// Import Updaters and Effects, which are arrays of objects:
// [ { actionType: string, (updater|effect): function }, ... ] 
const updaters = require("./updaters")
const effects = require("./effects")

const actionReader = new BitsharesActionReader(
  "http://some-bitshares-endpoint:9080", // Locally hosted node needed for reasonable indexing speed
  12345678, // First actions relevant to this app happens at this block
)

const actionHandler = new MyActionHandler(
  updaters,
  effects,
)

const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  1500, // Poll at twice the block interval for less latency
)

actionWatcher.watch() // Start watch loop
```

For more complete examples, [see the examples directory](examples/).