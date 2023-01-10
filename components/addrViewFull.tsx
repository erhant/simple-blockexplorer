import {Anchor, Box, Group, ScrollArea, Table, Text, Title} from '@mantine/core';
import {BigNumber, ethers} from 'ethers';
import {formatEther, hexValue} from 'ethers/lib/utils';
import Link from 'next/link';
import {FC, ReactNode} from 'react';
import constants from '../constants';
import {AddrType} from '../types/blockchain';
import {addressToKnownAddress} from '../utilities';
import CodeView from './codeView';
import ClipboardCopyButton from './copiableString';

const AddrViewFull: FC<{addr: AddrType}> = ({addr}) => {
  console.log(addr);
  let data: [string, ReactNode][] = [
    ['Name', addressToKnownAddress(addr.address)],
    ['Address', <Text key="addr">{addr.address}</Text>],
    ['Balance', formatEther(addr.balance) + ' ' + constants.symbolEth],
    ['Nonce', addr.nonce],
  ];

  return (
    <Box
      sx={theme => ({
        width: theme.breakpoints.lg,
      })}
    >
      <Title my="md">Address</Title>
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
      <Title my="md" order={3}>
        Code
      </Title>
      <CodeView code={addr.code} />
    </Box>
  );
};

export default AddrViewFull;
