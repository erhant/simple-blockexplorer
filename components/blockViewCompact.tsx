import {Anchor, Button, Group, Table, Title} from '@mantine/core';
import Link from 'next/link';
import {FC} from 'react';
import {BlockType} from '../types/blockchain';
import {timeElapsedAsString, truncateHex} from '../utilities';
import ClipboardCopyButton from './copiableString';

const BlockViewCompactTable: FC<{blocks: BlockType[]}> = ({blocks}) => {
  return (
    <Table verticalSpacing={3} highlightOnHover captionSide="top" fontSize="lg">
      <caption>
        <Title order={3}>Blocks</Title>
      </caption>
      <thead>
        <tr>
          <th>Block</th>
          <th>Hash</th>
          <th>Miner</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {blocks.map((b, i) => (
          <BlockViewCompactRow key={i} block={b} />
        ))}
      </tbody>
    </Table>
  );
};

const BlockViewCompactRow: FC<{block: BlockType}> = ({block}) => {
  return (
    <tr>
      <td>
        <Link href={'/block/' + block.number} passHref>
          <Button variant="light">{block.number}</Button>
        </Link>
      </td>
      <td>
        <Group>
          <Link href={'/block/' + block.hash} passHref>
            <Anchor>{truncateHex(block.hash)}</Anchor>
          </Link>
          <ClipboardCopyButton str={block.hash} />
        </Group>
      </td>
      <td>
        <Group>
          <Link href={'/address/' + block.miner} passHref>
            <Anchor>{truncateHex(block.miner)}</Anchor>
          </Link>
          <ClipboardCopyButton str={block.miner} />
        </Group>
      </td>
      <td>{timeElapsedAsString(block.timestamp) + ' ago'}</td>
    </tr>
  );
};

export default BlockViewCompactTable;
