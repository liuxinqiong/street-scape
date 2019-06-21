import React, { useState } from 'react';
import styles from './CategoryPercent.module.scss';

const mockData = [
  {
    id: 1,
    en: 'Category',
    zh: '类别1',
    color: '#6766FF',
    percent: '60%'
  },
  {
    id: 2,
    en: 'Category',
    zh: '类别1',
    color: '#FF75D5',
    percent: '20%'
  },
  {
    id: 3,
    en: 'Category',
    zh: '类别1',
    color: '#F1AA7C',
    percent: '10%'
  },
  {
    id: 4,
    en: 'Category',
    zh: '类别1',
    color: '#FFFB7E',
    percent: '5%'
  },
  {
    id: 5,
    en: 'Category',
    zh: '类别1',
    color: '#73F0A4',
    percent: '5%'
  }
];

type PropsType = {
  className: string
}

export default function(props: PropsType) {
  const [list, setList] = useState(mockData);
  const { className } = props;
  return (
    <div className={`${styles.percent} ${className}`}>
      {list.map(item => (
        <div className={styles.item} style={{width: item.percent}}  key={item.id}>
          <div className={styles.colorItem} style={{backgroundColor: item.color}}>{item.percent}</div>
          <div className={styles.textItem}>{item.zh}<br/>{item.en}</div>
        </div>
        
      ))}
    </div>
  );
}
