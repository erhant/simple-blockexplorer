import {Anchor, Box, Text, Title, Table, Group, useMantineTheme} from '@mantine/core';
import {formatEther} from 'ethers/lib/utils';
import Link from 'next/link';
import {FC} from 'react';
import constants from '../constants';
import {BlockType, TxType} from '../types/blockchain';
import {addressToKnownAddress, timeElapsedAsString, truncateHex} from '../utilities';
import ClipboardCopyButton from './copiableString';
import LinkableString from './linkableString';

const BlockViewFull: FC<{block: BlockType}> = ({block}) => {
  let data: [string, any][] = [
    ['Hash', <Text key="hash">{block.hash}</Text>],
    ['Number', block.number],
    ['Timestamp', `${block.timestamp.toLocaleString()} (${timeElapsedAsString(block.timestamp)} ago)`],
    ['Size', block.size],
    [
      'Parent Hash',
      <LinkableString
        key="phash"
        href={'/block/' + block.parentHash}
        display={block.parentHash}
        clipboard={block.parentHash}
      />,
    ],
    ['Difficulty', block.difficulty.toString()],
    [
      'Miner',
      <LinkableString key="miner" href={'/address/' + block.miner} display={block.miner} clipboard={block.miner} />,
    ],
    ['Gas Limit', block.gasLimit.toString() + ' ' + constants.symbolGwei],
    ['Gas Used', block.gasUsed.toString() + ' ' + constants.symbolGwei],
    ['Base Fee / Gas', block.baseFeePerGas.toString() + ' ' + constants.symbolGwei],
    ['Nonce', block.nonce],
    ['Transactions', block.transactions.length],
  ];
  return (
    <Box
      sx={theme => ({
        width: theme.breakpoints.lg,
      })}
    >
      <Title my="md">Block</Title>
      <Table sx={{minWidth: '100%'}}>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map(vals => (
            <tr key={vals[0]}>
              <td>
                <b>{vals[0]}</b>
              </td>
              <td>{vals[1]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Title order={2} my="md">
        Transactions within the block
      </Title>
      <Table>
        <thead>
          <tr>
            <th>Hash</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {block.transactions.map((tx, i) => (
            <BlockTxViewCompactRow key={i} tx={tx} />
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

const BlockTxViewCompactRow: FC<{tx: TxType}> = ({tx}) => {
  console.log(tx);
  return (
    <tr>
      <td>
        <LinkableString href={'/transaction/' + tx.hash} display={truncateHex(tx.hash)} clipboard={tx.hash} />
      </td>
      <td>
        <LinkableString
          href={'/address/' + tx.from}
          display={addressToKnownAddress(tx.from, true)}
          clipboard={tx.from}
        />
      </td>
      <td>
        {tx.to ? (
          <LinkableString href={'/address/' + tx.to} display={addressToKnownAddress(tx.to, true)} clipboard={tx.to} />
        ) : (
          '📝 Creation'
        )}
      </td>
      <td>
        <Text>{formatEther(tx.value) + ' ' + constants.symbolEth}</Text>
      </td>
    </tr>
  );
};

export default BlockViewFull;
