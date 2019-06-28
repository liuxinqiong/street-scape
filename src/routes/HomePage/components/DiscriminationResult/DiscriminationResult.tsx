import React, { useState } from 'react';
import { Icon, Empty } from 'antd';
import { connect } from 'react-redux';
import styles from './DiscriminationResult.module.scss';
import CategoryPercent from './CategoryPercent';
import StreetView from './StreetView';
import { Road } from 'models/Road';
import { CategoryColors } from 'constants/colors';
import environment from 'environments/environment';

type PropsType = {
  classifiedRoads: any;
};

function normalizeViewData(road: Road) {
  if (!road) {
    return [];
  }
  return road.points.map(point => ({
    id: point.id,
    color: CategoryColors[point.category[0]],
    src: `${environment.assertUrl}/pic?id=${point.pic_id}`
  }));
}

function normalizeCategoryData(road: Road) {
  if (!road) {
    return [];
  }
  const category: any = {};
  road.points.forEach(point => {
    const [categoryId, categoryName] = point.category;
    if (category[categoryId]) {
      category[categoryId].count++;
    } else {
      category[categoryId] = {
        id: categoryId,
        name: categoryName,
        color: CategoryColors[categoryId],
        count: 1
      };
    }
  });
  return Object.values(category);
}

function DiscriminationResult(props: PropsType) {
  const [index, setIndex] = useState(0);
  const { classifiedRoads } = props;
  const keys = Object.keys(classifiedRoads);
  const length = keys.length;
  const emptyText = '暂无数据，请点击街道进行分析';
  const road = classifiedRoads[keys[index]];
  const viewData = normalizeViewData(road);
  const categoryData = normalizeCategoryData(road);

  // TODO
  function highLightClickPoint(id: number) {
    console.log(id);
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
              <StreetView
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
          description={emptyText}
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
