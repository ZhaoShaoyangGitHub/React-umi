import React from 'react';
import styles from './index.less';
import SearchInput from './SearchInput';
import Carousel from './Carousel';
import NavTable from './NavTable';
import Arc from '@/components/Arc';
import Recommend from './Recommend';

const Home = () => {
  return (
    <div className={styles.main}>
      <SearchInput />
      <Carousel />
      <Arc />
      <NavTable />
      <Recommend />
    </div>
  );
};

export default Home;
