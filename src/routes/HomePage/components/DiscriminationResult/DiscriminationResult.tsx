import React, { useState, useRef } from 'react';
import { Icon, Empty } from 'antd';
import { connect } from 'react-redux';
import styles from './DiscriminationResult.module.scss';
import CategoryPercent from '../CategoryPercent/CategoryPercent';
import { StreetView as StreetViewComp } from '../StreetView/StreetView';
import {
  normalizeViewData,
  normalizeCategoryData,
  findPointById
} from './DiscriminationResult.logic';

declare const BMap: any;

type PropsType = {
  classifiedRoads: any;
  map: any;
};

function DiscriminationResult(props: PropsType) {
  const [index, setIndex] = useState(0);
  const { classifiedRoads } = props;
  const keys = Object.keys(classifiedRoads);
  const length = keys.length;
  const road = classifiedRoads[keys[index]];
  const viewData = normalizeViewData(road);
  const categoryData = normalizeCategoryData(road);
  const prevMarker = useRef(null);

  function highLightClickPoint(id: number) {
    const { map } = props;

    // 如果存在之前标注，则删除
    if (prevMarker.current) {
      map.removeOverlay(prevMarker.current);
    }

    const point: any = findPointById(road, id);
    const marker = new BMap.Marker(new BMap.Point(...point.coord));
    map.addOverlay(marker);
    prevMarker.current = marker;
  }

  return (
    <div className={styles.panel}>
      <div className={styles.info}>
        <div className={styles.title}>
          识别结果
          <br />
          Discrimination Result
        </div>
      </div>
      {length ? (
        <>
          <div className={styles.name}>{road.name}</div>
          <div className={styles.detail}>
            <div className={styles.iconContainer}>
              {length > 1 && index !== 0 && (
                <Icon
                  type="caret-left"
                  className={styles.icon}
                  onClick={() => {
                    setIndex(index - 1);
                  }}
                />
              )}
            </div>
            <div className={styles.content}>
              <StreetViewComp
                viewData={viewData}
                highLightClickPoint={highLightClickPoint}
              />
              <CategoryPercent
                className={styles.categoryPercent}
                categoryData={categoryData}
                totalCount={road.points.length}
              />
            </div>
            <div className={styles.iconContainer}>
              {length > 1 && index !== length - 1 && (
                <Icon
                  type="caret-right"
                  className={styles.icon}
                  onClick={() => {
                    setIndex(index + 1);
                  }}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="暂无数据，请点击街道进行分析"
          className={styles.emptyTip}
        />
      )}
    </div>
  );
}

/* istanbul ignore next */
function mapStateToProps(state: any) {
  return {
    classifiedRoads: state.home.classifiedRoads,
    map: state.home.map
  };
}

/* istanbul ignore next */
function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscriminationResult);
