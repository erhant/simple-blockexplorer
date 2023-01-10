import {BigNumber} from 'ethers';

// https://ethereum.org/en/developers/docs/apis/json-rpc

export type TxType = {
  blockHash: string;
  blockNumber: number;
  chainId: number;
  from: string;
  gas: BigNumber;
  gasPrice: BigNumber;
  hash: string;
  input: string;
  // maxFeePerGas: BigNumber;
  // maxPriorityFeePerGas: BigNumber;
  nonce: number;
  r: BigNumber;
  s: BigNumber;
  v: BigNumber;
  to: string | null;
  transactionIndex: number;
  value: BigNumber;
  type: number;
};

export type BlockType = {
  number: number;
  hash: string;
  parentHash: string;
  nonce: number;
  mixHash: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  miner: string;
  difficulty: BigNumber;
  totalDifficulty: BigNumber;
  extraData: string;
  size: number;
  gasLimit: BigNumber;
  gasUsed: BigNumber;
  timestamp: Date;
  transactions: TxType[];
  baseFeePerGas: BigNumber;
};

export type TxReceiptType = {
  from: string;
  to: string;
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  blockNumber: number;
  status: boolean; // either 1 (success) or 0 (failure)
  cumulativeGasUsed: BigNumber; // total amount of gas used when this transaction was executed in the block.
  root: string;
  contractAddress: string | null;
  gasUsed: BigNumber;
  logs: any[];
  logsBloom: string;
};

export type AddrType = {
  address: string;
  code: string;
  balance: BigNumber;
  nonce: number;
};
