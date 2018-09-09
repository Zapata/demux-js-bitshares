const { BaseActionWatcher } = require("demux")
const { BitsharesActionReader } = require("demux-bitshares") // eslint-disable-line
const ObjectActionHandler = require("./ObjectActionHandler")
const updaters = require("./updaters")
const effects = require("./effects")


const actionHandler = new ObjectActionHandler(
  updaters,
  effects,
)

const actionReader = new BitsharesActionReader(
  "https://localhost:9080",
  28999264,
)

const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  1500,
)

actionWatcher.watch()
