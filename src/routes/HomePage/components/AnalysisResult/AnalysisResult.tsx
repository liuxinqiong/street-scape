import React, { useState, useEffect, useRef } from 'react';
import { Icon, Table, Input, Empty, Spin } from 'antd';
import { connect } from 'react-redux';

import Echarts from 'components/Echarts/Echarts';
import { ClassifiedRoadsType } from 'models/Road';
import styles from './AnalysisResult.module.scss';
import Bar from 'components/Bar/Bar';
import { getEchartsOption, normalizeTableData } from './AnalysisResult.logic';
import { correlationMatrix } from 'api/road';

const { Search } = Input;

type PropsType = {
  classifiedRoads: ClassifiedRoadsType;
  selectedModel: string;
};

function AnalysisResult(props: PropsType) {
  const [showingIndex, setShowingIndex] = useState(0);
  const length = Object.keys(props.classifiedRoads).length;
  const columnsRef = useRef<any>([]);
  const dataSourceRef = useRef<any>([]);
  const [dataSource, setDataSource] = useState<any>([]);
  const panelStyle = {
    transform: `translateX(${-showingIndex + '00%'})`
  };

  useEffect(() => {
    const { columns, dataSource } = normalizeTableData(props.classifiedRoads, {
      colClassName: styles.colClassName,
      render: (percent: number, color: string) => (
        <Bar
          style={{
            width: percent * 100 + '%',
            backgroundColor: color
          }}
        />
      )
    });
    columnsRef.current = columns;
    dataSourceRef.current = dataSource;
    setDataSource(dataSource);
  }, [props.classifiedRoads]);

  const echartsOption = getEchartsOption(props.classifiedRoads);

  function filterDataSource(value: string) {
    setDataSource(
      dataSourceRef.current.filter(
        (item: any) => item.name.indexOf(value) !== -1
      )
    );
  }
  const [correlationImg, setCorrelationImg] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const ids = Object.keys(props.classifiedRoads);
    if (!ids.length) {
      return;
    }
    setLoading(true);
    correlationMatrix(props.selectedModel, ids)
      .then(res => {
        setCorrelationImg(`data:image/png;base64, ${res.data}`);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
      });
  }, [props.classifiedRoads, props.selectedModel]);

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
                  <Search
                    placeholder="道路标题 Street Name"
                    onSearch={filterDataSource}
                    style={{ width: 200 }}
                  />
                </div>
                <Table
                  dataSource={dataSource}
                  columns={columnsRef.current}
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
              </div>
            </div>
            <div className={styles.chartsPanel}>
              {length ? (
                <Echarts className={styles.echarts} option={echartsOption} />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="暂无数据，请点击街道进行分析"
                  className={styles.emptyTip}
                />
              )}
            </div>
            <div className={styles.pairwisePanel}>
              <div className={styles.title}>
                相关性分析 Pairwise Correlation
              </div>
              {length ? (
                loading ? (
                  <Spin size="large" className={styles.spin} />
                ) : (
                  <img
                    className={styles.pairwiseImage}
                    src={correlationImg}
                    alt=""
                  />
                )
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="暂无数据，请点击街道进行分析"
                  className={styles.emptyTip}
                />
              )}
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
    classifiedRoads: state.home.classifiedRoads,
    selectedModel: state.home.selectedModel
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
