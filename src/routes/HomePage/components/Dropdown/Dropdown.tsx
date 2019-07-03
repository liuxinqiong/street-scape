import React from 'react';
import styles from './Dropdown.module.scss';
import { Button } from 'antd';

export default function(props: any) {
  return (
    <div className={styles.dropdown}>
      <Button className={styles.normalButton} onClick={props.clearAll}>
        全清 Clear All
      </Button>
      <Button className={styles.normalButton} onClick={props.selectAll}>
        全选 Select All
      </Button>
      <Button
        className={styles.evaluateButton}
        onClick={props.evaluate}
        loading={props.loading}
      >
        评估 Evaluate
      </Button>
    </div>
  );
}
