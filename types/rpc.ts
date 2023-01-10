export type RPCMethodTypes =
  // state
  | 'eth_getBalance'
  | 'eth_getStorageAt'
  | 'eth_getTransactionCount'
  | 'eth_getCode'
  | 'eth_call'
  | 'eth_estimateGas'
  // history
  | 'eth_getBlockTransactionCountByHash'
  | 'eth_getBlockTransactionCountByNumber'
  | 'eth_getUncleCountByBlockHash'
  | 'eth_getUncleCountByBlockNumber'
  | 'eth_getBlockByHash'
  | 'eth_getBlockByNumber'
  | 'eth_getTransactionByHash'
  | 'eth_getTransactionByBlockHashAndIndex'
  | 'eth_getTransactionByBlockNumberAndIndex'
  | 'eth_getTransactionReceipt'
  | 'eth_getUncleByBlockHashAndIndex'
  | 'eth_getUncleByBlockNumberAndIndex'
  // gossip
  | 'eth_blockNumber'
  | 'eth_sendRawTransaction';

export type RPCParamTag = 'latest' | 'earliest' | 'pending';
