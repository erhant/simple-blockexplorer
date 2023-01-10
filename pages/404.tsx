import {Title} from '@mantine/core';
import Layout from '../components/layout';
import Head from 'next/head';
import {NextPage} from 'next';

const Custom404: NextPage = () => {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <Layout>
        <>
          <Title order={1} m="xl" sx={{textAlign: 'center'}}>
            {'Did you get lost?'}
          </Title>
        </>
      </Layout>
    </>
  );
};

export default Custom404;
