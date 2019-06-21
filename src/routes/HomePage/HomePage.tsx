import React from 'react';
import styles from './HomePage.module.scss';
import Map from '../../components/Map/Map';
import HomeFooter from './components/HomeFooter/HomeFooter';
import HomeHeader from './components/HomeHeader/HomeHeader';

const HomePage: React.FC = (): JSX.Element => {
  return (
    <div className={styles.home}>
      <HomeHeader />
      <div className={styles.mapContainer}>
        <Map />
      </div>
      <HomeFooter />
    </div>
  );
};

export default HomePage;
