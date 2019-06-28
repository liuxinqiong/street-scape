import React, { useState, useEffect } from 'react';
import styles from './AnalysisResult.module.scss';
import { Icon, Table } from 'antd';
import Echarts from 'components/Echarts/Echarts';
import { connect } from 'react-redux';
import { ClassifiedRoadsType } from 'models/Road';
import { CategoryColors } from 'constants/colors';

function getEchartsOption(roads: ClassifiedRoadsType) {
  const categoryMap = new Map<number, any>();
  const ids = Object.keys(roads);
  let totalCount = 0;
  ids.forEach((id: any) => {
    const road = roads[id];
    totalCount += road.points.length;
    road.points.forEach(point => {
      const [categoryId, categoryName] = point.category;
      const item = categoryMap.get(categoryId);
      if (item) {
        item.count++;
      } else {
        categoryMap.set(categoryId, {
          categoryId: categoryId,
          categoryName: categoryName,
          count: 1
        });
      }
    });
  });
  const categoryNames = [];
  const data = [];
  for (const category of categoryMap.values()) {
    categoryNames.push(category.categoryName);
    data.push({
      value: category.count / totalCount,
      itemStyle: {
        color: CategoryColors[category.categoryId]
      }
    });
  }
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: categoryNames,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: '60%',
        data: data
      }
    ]
  };
}

function normalizeTableData(roads: ClassifiedRoadsType, colClassName: string) {
  // 类别的并集
  const categoryMap = new Map<number, any>();
  const ids = Object.keys(roads);
  const categoryIds = new Map<number, any>();
  ids.forEach((id: any) => {
    const road = roads[id];
    const roadCategory = new Map();
    road.points.forEach(point => {
      const [categoryId, categoryName] = point.category;
      categoryIds.set(categoryId, {
        categoryId,
        categoryName
      });
      const category = roadCategory.get(categoryId);
      if (category) {
        category.count++;
      } else {
        roadCategory.set(categoryId, {
          categoryId,
          categoryName,
          color: CategoryColors[categoryId],
          count: 1
        });
      }
    });
    categoryMap.set(road.id, roadCategory);
  });
  const columns: any[] = [
    {
      title: '道路名称',
      dataIndex: 'name',
      key: 'name',
      className: colClassName
    }
  ];
  for (const id of categoryIds.keys()) {
    const category = categoryIds.get(id);
    columns.push({
      title: category.categoryName,
      dataIndex: id,
      key: id,
      className: colClassName,
      sortDirections: ['descend', 'ascend'],
      sorter: (a: any, b: any) => a - b
    });
  }
  const dataSource: any[] = [];
  for (const roadId of categoryMap.keys()) {
    const row: any = { key: roadId };
    const roadCategory = categoryMap.get(roadId);
    row.name = roads[roadId as any].name;
    for (const id of categoryIds.keys()) {
      const cate = roadCategory.get(id);
      if (cate) {
        row[id] = cate.count / roads[roadId as any].points.length;
      } else {
        row[id] = 0;
      }
    }
    dataSource.push(row);
  }
  return {
    columns,
    dataSource
  };
}

type PropsType = {
  classifiedRoads: ClassifiedRoadsType;
};

function AnalysisResult(props: PropsType) {
  const [showingIndex, setShowingIndex] = useState(0);
  const panelStyle = {
    transform: `translateX(${-showingIndex + '00%'})`
  };

  const { columns, dataSource } = normalizeTableData(
    props.classifiedRoads,
    styles.colClassName
  );

  const echartsOption = getEchartsOption(props.classifiedRoads);

  return (
    <div className={styles.panel}>
      <div className={styles.iconContainer}>
        {showingIndex !== 0 && (
          <Icon
            type="caret-left"
            className={styles.icon}
            onClick={() => {
              setShowingIndex(showingIndex - 1);
            }}
          />
        )}
      </div>
      <div className={styles.info}>
        <div>
          分析结果
          <br />
          Analysis Result
        </div>
        <div className={styles.container}>
          <div className={styles.panels} style={panelStyle}>
            <div className={styles.rankPanel}>
              <div className={styles.content}>
                <div className={styles.top}>
                  <span className={styles.tableTitle}>排序 Ranking</span>
                  {/* <Icon type="caret-up" className={styles.icon} /> */}
                </div>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  size="small"
                  rowClassName={() => styles.rowClassName}
                  className={styles.tableClassName}
                  pagination={{
                    size: 'small',
                    pageSize: 20,
                    className: styles.pagination
                  }}
                  locale={{
                    emptyText: '暂无数据'
                  }}
                />
                {/* <div className={styles.bottom}>
                  <Icon type="caret-down" className={styles.icon} />
                </div> */}
              </div>
            </div>
            <div className={styles.chartsPanel}>
              <Echarts className={styles.echarts} option={echartsOption} />
            </div>
            <div className={styles.pairwisePanel}>
              <div className={styles.title}>
                相关性分析 Pairwise Correlation
              </div>
              <img
                className={styles.pairwiseImage}
                src="http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold6.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.iconContainer}>
        {showingIndex !== 2 && (
          <Icon
            type="caret-right"
            className={styles.icon}
            onClick={() => {
              setShowingIndex(showingIndex + 1);
            }}
          />
        )}
      </div>
    </div>
  );
}

/* istanbul ignore next */
function mapStateToProps(state: any) {
  return {
    classifiedRoads: state.home.classifiedRoads
  };
}

/* istanbul ignore next */
function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnalysisResult);
