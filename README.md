# Simple Blockexplorer

This blockexplorer is a client-only (i.e. serverless) block explorer, where the client makes RPC calls directly to the blockchain node.

- Search bar to directly query an address / transaction / block.
- Changeable RPC URL with chain ID verification.
- Custom known addresses for better UX.
- Light & dark theme support.

Here are some example RPC urls and chain IDs

```md
## Hardhat Local

http://localhost:8545
31337

## Avalanche

https://api.avax.network/ext/bc/C/rpc
43114

## Polygon

https://polygon-rpc.com
137
```

## Usage

Clone the repo, and just `yarn`. Then, `yarn dev` to run the web app locally. Enter the RPC url and the chain ID to the settings button on the top right.

## Required RPC Endpoints

The connected node must support the following:

- [`eth_blockNumber`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber)
- [`eth_call`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call)
- [`eth_getBalance`](https://eth.wiki/json-rpc/API#eth_getbalance)
- [`eth_getCode`](https://eth.wiki/json-rpc/API#eth_getcode)
- [`eth_getBlockByHash`](https://eth.wiki/json-rpc/API#eth_getblockbyhash)
- [`eth_getBlockByNumber`](https://eth.wiki/json-rpc/API#eth_getblockbynumber)
- [`eth_getTransactionByHash`](https://eth.wiki/json-rpc/API#eth_gettransactionbyhash)
- [`eth_getTransactionByBlockHashAndIndex`](https://eth.wiki/json-rpc/API#eth_gettransactionbyblockhashandindex)
- [`eth_getTransactionByBlockNumberAndIndex`](https://eth.wiki/json-rpc/API#eth_gettransactionbyblocknumberandindex)
- [`eth_getTransactionReceipt`](https://eth.wiki/json-rpc/API#eth_gettransactionreceipt)
- [`eth_getUncleByBlockHashAndIndex`](https://eth.wiki/json-rpc/API#eth_getunclebyblockhashandindex)
- [`eth_getLogs`](https://eth.wiki/json-rpc/API#eth_getlogs)

Inspired from [blockscout](https://docs.blockscout.com/for-developers/information-and-settings/node-tracing-json-rpc-requirements).
