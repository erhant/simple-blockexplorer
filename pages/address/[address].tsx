import {Loader, Title} from '@mantine/core';
import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import AddrViewFull from '../../components/addrViewFull';
import Layout from '../../components/layout';
import {useClientContext} from '../../context/client.context';
import {AddrType} from '../../types/blockchain';

const Address: NextPage = () => {
  const router = useRouter();
  const {client} = useClientContext();
  const {address} = router.query;
  const [error, setError] = useState<any>();
  const [addr, setAddr] = useState<AddrType>();

  useEffect(() => {
    console.log(address);
    if (address) {
      const addressStr = address as unknown as string; // TODO: check better way
      client.getAddr(addressStr).then(setAddr).catch(setError);
    }
  }, [address, router, client]);

  if (error)
    return (
      <Layout>
        <Title>Something went wrong.</Title>
      </Layout>
    );
  else return <Layout>{addr ? <AddrViewFull addr={addr} /> : <Loader />}</Layout>;
};

export default Address;
