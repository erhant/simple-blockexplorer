import {Loader, Title} from '@mantine/core';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import BlockViewFull from '../../components/blockViewFull';
import Layout from '../../components/layout';
import {useClientContext} from '../../context/client.context';
import {BlockType} from '../../types/blockchain';

/// Block details via hash
const BlockByHash: NextPage = () => {
  const router = useRouter();
  const {client} = useClientContext();
  const {hashOrNum} = router.query;
  const [error, setError] = useState<any>();
  const [block, setBlock] = useState<BlockType>();

  // console.log('Block:', block);
  useEffect(() => {
    if (hashOrNum) {
      const hashOrNumStr = hashOrNum as unknown as string;
      if (hashOrNumStr.slice(0, 2) == '0x') {
        client.getBlockByHash(hashOrNumStr).then(setBlock).catch(setError);
      } else {
        client.getBlockByNumber(parseInt(hashOrNumStr)).then(setBlock).catch(setError);
      }
    }
  }, [hashOrNum, router, client]);

  if (error)
    return (
      <Layout>
        <Title>No such block!</Title>
      </Layout>
    );
  else return <Layout>{block ? <BlockViewFull block={block} /> : <Loader />}</Layout>;
};

export default BlockByHash;
