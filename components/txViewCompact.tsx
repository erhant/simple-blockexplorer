import {Button, Table, Title} from '@mantine/core';
import Link from 'next/link';
import type {FC} from 'react';
import type {TxType} from '../types/blockchain';
import {addressToKnownAddress, truncateHex} from '../utilities';
import LinkableString from './linkableString';

const TxViewCompactTable: FC<{txs: TxType[]}> = ({txs}) => {
  return (
    <Table verticalSpacing={3} highlightOnHover captionSide="top" fontSize="lg">
      <caption>
        <Title order={3}>Transactions</Title>
      </caption>
      <thead>
        <tr>
          <th>Hash</th>
          <th>From</th>
          <th>To</th>
          <th>Block</th>
        </tr>
      </thead>
      <tbody>
        {txs.map((b, i) => (
          <TxViewCompactRow key={i} tx={b} />
        ))}
      </tbody>
    </Table>
  );
};

const TxViewCompactRow: FC<{tx: TxType}> = ({tx}) => {
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
        <Link href={'/block/' + tx.blockNumber} passHref>
          <Button variant="light">{tx.blockNumber}</Button>
        </Link>
      </td>
    </tr>
  );
};

export default TxViewCompactTable;
