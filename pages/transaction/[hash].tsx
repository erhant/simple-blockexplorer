import {Loader, Title} from '@mantine/core';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import Layout from '../../components/layout';
import TxViewFull from '../../components/txViewFull';
import {useClientContext} from '../../context/client.context';
import {TxType} from '../../types/blockchain';

const TxByHash: NextPage = () => {
  const {client} = useClientContext();
  const router = useRouter();
  const {hash} = router.query;
  const [error, setError] = useState<any>();
  const [tx, setTx] = useState<TxType>();

  useEffect(() => {
    console.log(hash);
    if (hash) {
      const hashStr = hash as unknown as string; // TODO: check better way
      client.getTxByHash(hashStr).then(setTx).catch(setError);
    }
  }, [hash, router, client]);

  if (error)
    return (
      <Layout>
        <Title>No such transaction!</Title>
      </Layout>
    );
  else return <Layout>{tx ? <TxViewFull tx={tx} /> : <Loader />}</Layout>;
};

export default TxByHash;
