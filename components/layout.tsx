import {Container} from '@mantine/core';
import type {FC, ReactNode} from 'react';
import styles from '../styles/layout.module.scss';
import Header from './header';

const Layout: FC<{
  children: ReactNode;
}> = ({children}) => {
  return (
    <div className={styles['layout']}>
      <Header />
      <Container size="xl">{children}</Container>
      {/* <div style={{flexGrow: 1}} />
      <Footer /> */}
    </div>
  );
};

export default Layout;
