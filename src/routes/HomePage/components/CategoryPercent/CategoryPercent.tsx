import React from 'react';
import styles from './CategoryPercent.module.scss';
import { accDiv } from 'utils/calc';

type PropsType = {
  className: string;
  categoryData: any[];
  totalCount: number;
};

export default function(props: PropsType) {
  const { className, categoryData, totalCount } = props;
  return (
    <div className={`${styles.percent} ${className}`}>
      {categoryData.map(item => (
        <div
          className={styles.item}
          style={{ width: (item.count / totalCount) * 100 + '%' }}
          key={item.id}
        >
          <div
            className={styles.colorItem}
            style={{ backgroundColor: item.color }}
          >
            {Math.round(accDiv(item.count, totalCount) * 100) + '%'}
          </div>
          <div className={styles.textItem}>{item.name}</div>
        </div>
      ))}
    </div>
  );
}
