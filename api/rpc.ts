import axios from 'axios';
import {BigNumber} from 'ethers';
import {AddrType, BlockType, TxReceiptType, TxType} from '../types/blockchain';
import {RPCMethodTypes, RPCParamTag} from '../types/rpc';

export async function testConnection(rpcUrl: string, chainId: number) {
  try {
    const res = await axios.post(rpcUrl, {
      jsonrpc: '2.0',
      method: 'net_version',
      params: [],
      id: 1,
    });
    // console.log(res);
    const responseChainId = parseInt(res.data.result);
    if (chainId == responseChainId) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

export class RPCClient {
  URL: string;
  chainId: number;
  constructor(rpcUrl: string, chainId: number) {
    this.URL = rpcUrl;
    this.chainId = chainId;
  }

  async rpcGeneric(method: RPCMethodTypes, params: (string | number | boolean)[] = []): Promise<any> {
    // NOTE: if you send 0x02 instead of 0x2 it will give error on RPC
    params = params.map(p => (typeof p == 'number' ? '0x' + p.toString(16) : p));
    const id = Math.floor(Math.random() * 999999);
    const res = await axios.post(this.URL, {
      jsonrpc: '2.0',
      method,
      params,
      id,
    });
    // console.log(res);
    // console.log(res.data.result);
    if (id !== res.data.id) {
      throw new Error('JSON RPC Error: Mismatching ids.');
    }
    return res.data.result;
  }

  async getCurrentBlockNumber(): Promise<number> {
    return parseInt(await this.rpcGeneric('eth_blockNumber'));
  }

  async getCurrentBlock() {
    return this.getBlockByNumber('latest');
  }

  async getBlockByNumber(number: RPCParamTag | number = 'latest', withTxs: boolean = true): Promise<BlockType> {
    const block = await this.rpcGeneric('eth_getBlockByNumber', [number, withTxs]);
    return rawBlockToTypedBlock(block);
  }

  async getBlockByHash(hash: string, withTxs: boolean = true): Promise<BlockType> {
    const block = await this.rpcGeneric('eth_getBlockByHash', [hash, withTxs]);
    return rawBlockToTypedBlock(block);
  }

  async getTxByHash(hash: string): Promise<TxType> {
    const tx = await this.rpcGeneric('eth_getTransactionByHash', [hash]);
    return rawTxToTypedTx(tx);
  }

  async getAddr(address: string): Promise<AddrType> {
    const [balance, nonce, code] = await Promise.all([
      this.rpcGeneric('eth_getBalance', [address, 'latest']),
      this.rpcGeneric('eth_getTransactionCount', [address, 'latest']),
      this.rpcGeneric('eth_getCode', [address, 'latest']),
    ]);
    return {
      address,
      balance: BigNumber.from(balance),
      nonce: parseInt(nonce, 16),
      code,
    };
  }

  async getTxReceipt(hash: string): Promise<TxReceiptType> {
    const rec = await this.rpcGeneric('eth_getTransactionReceipt', [hash]);
    console.log(rec);
    return rawTxReceiptToTypedTxReceipt(rec);
  }

  async getLatestBlocks(limit: number, offset: number): Promise<BlockType[]> {
    const latestBlockNum = await this.getCurrentBlockNumber();
    const startBlockNum = Math.max(latestBlockNum - offset, 0);
    const endBlockNum = Math.max(startBlockNum - limit + 1, 0);
    const blockIds: number[] = new Array(startBlockNum - endBlockNum + 1).fill(0).map((_, i) => startBlockNum - i);
    // console.log('Getting blocks:', blockIds);
    const blocks = await Promise.all(blockIds.map(id => this.getBlockByNumber(id, true))); // TODO: make this false, with compact tx
    return blocks;
  }

  async getLatestTxs(limit: number, offset: number): Promise<TxType[]> {
    let ans: TxType[] = [];
    for (let curBlockNum = await this.getCurrentBlockNumber(); curBlockNum >= 0; curBlockNum--) {
      // get blocks until you have enough txs
      const block = await this.getBlockByNumber(curBlockNum, true);
      const numTxs = block.transactions.length;

      // skip offset txs
      if (offset > 0) {
        ans = ans.concat((block.transactions as TxType[]).slice(offset)); // handles out-of-bounds even if offset > len
        offset -= numTxs;
        continue;
      }

      // add txs w.r.t limit
      if (limit > 0) {
        ans = ans.concat((block.transactions as TxType[]).slice(0, limit)); // handles out-of-bounds even if limit > len
        limit -= numTxs;
      } else {
        break;
      }
    }
    return ans;
  }
}

function rawBlockToTypedBlock(block: any): BlockType {
  return {
    ...block,
    number: parseInt(block.number),
    nonce: parseInt(block.nonce),
    difficulty: BigNumber.from(block.difficulty),
    totalDifficulty: BigNumber.from(block.totalDifficulty),
    size: parseInt(block.size),
    gasLimit: BigNumber.from(block.gasLimit),
    gasUsed: BigNumber.from(block.gasUsed),
    baseFeePerGas: BigNumber.from(block.baseFeePerGas),
    timestamp: new Date(parseInt(block.timestamp) * 1000),
    transactions: block.transactions.map(rawTxToTypedTx),
  };
}

function rawTxToTypedTx(tx: any): TxType {
  return {
    ...tx,
    blockNumber: parseInt(tx.blockNumber),
    chainId: parseInt(tx.chainId),
    gas: BigNumber.from(tx.gas),
    gasPrice: BigNumber.from(tx.gasPrice),
    // maxFeePerGas: BigNumber.from(tx.maxFeePerGas),
    // maxPriorityFeePerGas: BigNumber.from(tx.maxPriorityFeePerGas),
    nonce: parseInt(tx.nonce),
    r: BigNumber.from(tx.r),
    v: BigNumber.from(tx.v),
    s: BigNumber.from(tx.s),
    transactionIndex: parseInt(tx.transactionIndex),
    value: BigNumber.from(tx.value),
    type: parseInt(tx.type),
  };
}

function rawTxReceiptToTypedTxReceipt(rec: any): TxReceiptType {
  console.log('LOGS:', rec.logs);
  return {
    ...rec,
    logs: rec.logs, // log objects
    status: rec.status == '0x1',
    gasUsed: BigNumber.from(rec.gasUsed),
    cumulativeGasUsed: BigNumber.from(rec.cumulativeGasUsed),
  };
}
