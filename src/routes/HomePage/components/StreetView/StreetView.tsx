import React from 'react';
import styles from './StreetView.module.scss';

interface DataItem {
  id: number;
  color: string;
  src: string;
}

type PropsType = {
  viewData: DataItem[];
  highLightClickPoint: Function;
};

export function StreetView(props: PropsType) {
  const { viewData, highLightClickPoint } = props;
  const cellWidth = 100 / viewData.length + '%';

  return (
    <div className={styles.streetView}>
      {viewData.map(item => (
        <div className={styles.item} key={item.id} style={{ width: cellWidth }}>
          <div
            className={styles.categoryItem}
            style={{ backgroundColor: item.color }}
          />
          <div
            className={styles.imageItem}
            style={{
              background: `url(${item.src}) no-repeat center 0`,
              backgroundSize: 'auto 100%'
            }}
            onClick={() => {
              highLightClickPoint(item.id);
            }}
          />
        </div>
      ))}
    </div>
  );
}
