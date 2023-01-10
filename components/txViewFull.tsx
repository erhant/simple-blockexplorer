import {Box, ScrollArea, Table, Text, Title} from '@mantine/core';
import {formatEther} from 'ethers/lib/utils';
import {FC, ReactNode, useEffect, useState} from 'react';
import constants from '../constants';
import {useClientContext} from '../context/client.context';
import {TxReceiptType, TxType} from '../types/blockchain';
import {addressToKnownAddress} from '../utilities';
import CodeView from './codeView';
import LinkableString from './linkableString';

const TxViewFull: FC<{tx: TxType}> = ({tx}) => {
  const {client} = useClientContext();
  const [receipt, setReceipt] = useState<TxReceiptType>();

  useEffect(() => {
    client.getTxReceipt(tx.hash).then(r => setReceipt(r));
  }, [client, tx.hash]);

  console.log(tx);
  let data: [string, ReactNode][] = [
    ['Hash', <Text key="hash">{tx.hash}</Text>],
    [
      'From',
      <LinkableString
        key="from"
        href={'/address/' + tx.from}
        display={addressToKnownAddress(tx.from)}
        clipboard={tx.from}
      />,
    ],
    [
      'To',
      tx.to ? (
        <LinkableString key="to" href={'/address/' + tx.to} display={addressToKnownAddress(tx.to)} clipboard={tx.to} />
      ) : (
        <i>Contract Creation</i>
      ),
    ],
    ['Value', formatEther(tx.value) + ' ' + constants.symbolEth],
    [
      'Block Hash',
      <LinkableString key="bhash" href={'/block/' + tx.blockHash} display={tx.blockHash} clipboard={tx.blockHash} />,
    ],
    ['Block Number', <LinkableString key="bhash" href={'/block/' + tx.blockNumber} display={tx.blockNumber} />],
    ['Transaction Index', tx.transactionIndex],
    ['Gas Used', tx.gas.toString() + ' ' + constants.symbolGwei],
    ['Gas Price', tx.gasPrice.toString() + ' ' + constants.symbolWei],
  ];
  let receiptData: [string, ReactNode][] = receipt
    ? [
        ['Status', receipt.status ? 'Success 🟢' : 'Failure 🔴'],
        [
          'Contract Address',
          receipt.contractAddress ? (
            <LinkableString
              key="contract"
              href={'/address/' + receipt.contractAddress}
              display={receipt.contractAddress}
              clipboard={receipt.contractAddress}
            />
          ) : (
            'None'
          ),
        ],
        ['Logs', receipt.logs.length],
        // ['Bloom Filter', receipt.logsBloom],
      ]
    : [['Status', 'Pending ⌛']];
  return (
    <Box
      sx={theme => ({
        width: theme.breakpoints.lg,
      })}
    >
      <Title my="md">Transaction</Title>
      <Table sx={{minWidth: '100%'}}>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.concat(receiptData).map(vals => (
            <tr key={vals[0]}>
              <td>
                <b>{vals[0]}</b>
              </td>
              <td>{vals[1]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Title my="md" order={3}>
        Data
      </Title>
      <CodeView code={tx.input} />
    </Box>
  );
};

export default TxViewFull;
