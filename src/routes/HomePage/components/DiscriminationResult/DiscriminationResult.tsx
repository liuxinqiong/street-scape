import React from 'react';
import { Icon } from 'antd';
import styles from './DiscriminationResult.module.scss';
import CategoryPercent from './CategoryPercent';
import StreetScape from './StreetScape';

function DiscriminationResult() {
  return (
    <div className={styles.panel}>
      <div className={styles.info}>
        <div className={styles.title}>
          识别结果
          <br />
          Discrimination Result
        </div>
        <div className={styles.name}>YYY 路，YYY Road</div>
      </div>
      <div className={styles.detail}>
        <Icon type="caret-left" className={styles.icon} />
        <div className={styles.content}>
          <StreetScape />
          <CategoryPercent className={styles.categoryPercent} />
        </div>
        <Icon type="caret-right" className={styles.icon} />
      </div>
    </div>
  );
}

export default DiscriminationResult;
