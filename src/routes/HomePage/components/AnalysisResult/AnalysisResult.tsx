import React, { useState } from 'react';
import styles from './AnalysisResult.module.scss';
import { Icon, Table } from 'antd';

const dataSource: any[] = (function(length) {
  var result = [];
  for(var i = 0; i < length; i++) {
    result.push({
      key: i,
      name: `XKool${i}`,
      age: 32 + i,
      address: `西湖区湖底公园${i}号`
    })
  }
  return result;
})(20)

export default function() {
  const [showingPanel, setShowingPanel] = useState('rank')
  const columns: any[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      className: styles.colClassName,
      sortDirections: ['descend', 'ascend'],
      sorter: (a: any, b: any) => a.name.length - b.name.length
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      className: styles.colClassName,
      sortDirections: ['descend', 'ascend'],
      sorter: (a: any, b: any) => a.age - b.age
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
      className: styles.colClassName,
      sortDirections: ['descend', 'ascend'],
      sorter: (a: any, b: any) => a.address.length - b.address.length,
    }
  ];

  function switchShowingPanel() {
    showingPanel === 'rank' ? setShowingPanel('pairwise') : setShowingPanel('rank');
  }

  return (
    <div className={styles.panel}>
      <Icon type="caret-left" className={styles.icon} onClick={switchShowingPanel} />
      <div className={styles.info}>
        <div>分析结果<br />Analysis Result</div>
        <div className={styles.panelContainer}>
          <div className={`${styles.rankPanel} ${showingPanel === 'rank' ? '' : styles.hide}`}>
            <div className={styles.content}>
              <div className={styles.top}>
                <span className={styles.tableTitle}>排序 Ranking</span>
                <Icon type="caret-up" className={styles.icon} />
              </div>
              <Table
                dataSource={dataSource}
                columns={columns}
                size="small"
                rowClassName={() => styles.rowClassName}
                className={styles.tableClassName}
                pagination={false}
              />
              <div className={styles.bottom}>
                <Icon type="caret-down" className={styles.icon} />
              </div>
            </div>
          </div>
          <div className={`${styles.pairwisePanel} ${showingPanel === 'pairwise' ? styles.show : ''}`} >
            <div className={styles.title}>相关性分析 Pairwise Correlation</div>
            <img className={styles.pairwiseImage} src="http://file.40017.cn/js40017cnproduct/cn/h/elong_pc/common/pic/20150120_ifold6.jpg" alt=""/>
          </div>
        </div>
      </div>
      <Icon type="caret-right" className={styles.icon} onClick={switchShowingPanel} />
    </div>
  );
}
