import React, { useState } from 'react';
import styles from './StreetScape.module.scss';

const mockData = [
  {
    id: 1,
    color: '#6766FF',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold7.jpg'
  },
  {
    id: 2,
    color: '#6766FF',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold6.jpg'
  },
  {
    id: 3,
    color: '#FF75D5',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold2.jpg'
  },
  {
    id: 4,
    color: '#FFFB7E',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold6.jpg'
  },
  {
    id: 5,
    color: '#6766FF',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold2.jpg'
  },
  {
    id: 6,
    color: '#FFFB7E',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold6.jpg'
  },
  {
    id: 7,
    color: '#FF75D5',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold4.jpg'
  },
  {
    id: 8,
    color: '#6766FF',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold2.jpg'
  },
  {
    id: 9,
    color: '#FFFB7E',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold6.jpg'
  },
  {
    id: 10,
    color: '#6766FF',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold4.jpg'
  },
  {
    id: 11,
    color: '#73F0A4',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold6.jpg'
  },
  {
    id: 12,
    color: '#F1AA7C',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150422_ifold1.jpg'
  },
  {
    id: 13,
    color: '#6766FF',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold6.jpg'
  },
  {
    id: 14,
    color: '#F1AA7C',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold4.jpg'
  },
  {
    id: 15,
    color: '#F1AA7C',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold6.jpg'
  },
  {
    id: 16,
    color: '#6766FF',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold6.jpg'
  },
  {
    id: 17,
    color: '#6766FF',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150422_ifold1.jpg'
  },
  {
    id: 18,
    color: '#73F0A4',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold6.jpg'
  },
  {
    id: 19,
    color: '#6766FF',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150422_ifold1.jpg'
  },
  {
    id: 20,
    color: '#F1AA7C',
    src:
      'http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold6.jpg'
  }
];

export default function() {
  const [list, setList] = useState(mockData);
  const cellWidth = 100 / list.length + '%';
  return (
    <div className={styles.streetScape}>
      {list.map(item => (
        <div className={styles.item} key={item.id} style={{ width: cellWidth }}>
          <div
            className={styles.categoryItem}
            style={{ backgroundColor: item.color }}
          />
          <div
            className={styles.imageItem}
            style={{ background: `url(${item.src}) no-repeat center 0` }}
          />
        </div>
      ))}
    </div>
  );
}
