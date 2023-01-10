import {Center, Loader} from '@mantine/core';
import type {NextPage} from 'next';
import {useState} from 'react';
import Layout from '../../components/layout';
import PaginationUnbounded from '../../components/paginationUnbounded';
import TxViewCompactTable from '../../components/txViewCompact';
import {useClientContext} from '../../context/client.context';
import type {TxType} from '../../types/blockchain';

const BATCH_SIZE = 15;

const AllTxs: NextPage = () => {
  const {client} = useClientContext();
  const [txs, setTxs] = useState<TxType[]>();
  const [isLoading, setIsLoading] = useState(true);

  function handlePageChange(page: number) {
    console.log('loading page', page, ':', page * BATCH_SIZE, (page - 1) * BATCH_SIZE);
    setIsLoading(true);
    client.getLatestTxs(BATCH_SIZE, (page - 1) * BATCH_SIZE).then(txs => {
      setTxs(txs);
      setIsLoading(false);
    });
  }

  return (
    <Layout>
      {txs ? <TxViewCompactTable txs={txs} /> : <Loader />}
      <Center my="md">
        <PaginationUnbounded
          onChange={handlePageChange}
          disableLeft={isLoading}
          disableRight={isLoading || (txs ? txs.length < BATCH_SIZE : true)}
        />
      </Center>
    </Layout>
  );
};

export default AllTxs;
