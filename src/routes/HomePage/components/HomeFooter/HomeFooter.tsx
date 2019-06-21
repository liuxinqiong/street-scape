import React, { useState } from 'react';
import { Icon } from 'antd';
import styles from './HomeFooter.module.scss';
import DiscriminationResult from '../DiscriminationResult/DiscriminationResult';
import AnalysisResult from '../AnalysisResult/AnalysisResult';

export default function() {
  const [showingPanel, setShowingPanel] = useState('');
  function changeShowingPanel(name: string) {
    showingPanel && showingPanel === name
      ? setShowingPanel('')
      : setShowingPanel(name);
  }

  return (
    <div className={`${styles.footer} ${styles[showingPanel]}`}>
      <div
        className={`${styles.entry} ${styles.discriminationEntry}`}
        onClick={() => {
          changeShowingPanel('discriminationPanel');
        }}
      >
        <Icon
          type="caret-up"
          className={`${
            showingPanel === 'discriminationPanel' ? styles.iconRotate : ''
          } ${styles.icon}`}
        />
      </div>
      {showingPanel === 'discriminationPanel' && <DiscriminationResult />}
      <div
        className={`${styles.entry} ${styles.analysisEntry}`}
        onClick={() => {
          changeShowingPanel('analysisPanel');
        }}
      >
        <Icon
          type="caret-up"
          className={`${
            showingPanel === 'analysisPanel' ? styles.iconRotate : ''
          } ${styles.icon}`}
        />
      </div>
      {showingPanel === 'analysisPanel' && <AnalysisResult />}
    </div>
  );
}
