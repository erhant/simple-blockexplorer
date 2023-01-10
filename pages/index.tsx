import {Anchor, Loader, SimpleGrid, Stack, Title} from '@mantine/core';
import type {NextPage} from 'next';
import {useEffect, useState} from 'react';
import Layout from '../components/layout';
import {BlockType, TxType} from '../types/blockchain';
import BlockViewCompactTable from '../components/blockViewCompact';
import TxViewCompactTable from '../components/txViewCompact';
import Link from 'next/link';
import {useClientContext} from '../context/client.context';

const Home: NextPage = () => {
  const {client} = useClientContext();
  const [error, setError] = useState<any>();
  const [latestBlocks, setLatestBlocks] = useState<BlockType[]>();
  const [latestTxs, setLatestTxs] = useState<TxType[]>();

  // console.log(latestTxs);
  useEffect(() => {
    Promise.all([client.getLatestBlocks(10, 0), client.getLatestTxs(10, 0)])
      .then(results => {
        setLatestBlocks(results[0]);
        setLatestTxs(results[1]);
      })
      .catch(setError);
  }, [client]);

  if (error) console.log('Something went wrong:', error);
  return (
    <Layout>
      {latestBlocks == undefined || latestTxs == undefined ? (
        <Loader />
      ) : (
        <SimpleGrid
          cols={2}
          spacing="lg"
          sx={theme => ({
            minWidth: theme.breakpoints.lg,
          })}
        >
          <Stack>
            <BlockViewCompactTable blocks={latestBlocks} />
            <Link href={'/block/all'} passHref>
              <Anchor>
                <Title order={4} sx={{textAlign: 'center'}}>
                  See all Blocks
                </Title>
              </Anchor>
            </Link>
          </Stack>
          <Stack>
            <TxViewCompactTable txs={latestTxs} />
            <Link href={'/transaction/all'} passHref>
              <Anchor>
                <Title order={4} sx={{textAlign: 'center'}}>
                  See all Transactions
                </Title>
              </Anchor>
            </Link>
          </Stack>
        </SimpleGrid>
      )}
    </Layout>
  );
};

export default Home;
