import React from 'react';
import styles from './Dropdown.module.scss';
import { Button } from 'antd';

export default function() {
  return (
    <div className={styles.dropdown}>
      <Button className={styles.normalButton}>全清 Clear All</Button>
      <Button className={styles.normalButton}>全选 Select All</Button>
      <Button className={styles.evaluateButton}>评估 Evaluate</Button>
    </div>
  );
}
