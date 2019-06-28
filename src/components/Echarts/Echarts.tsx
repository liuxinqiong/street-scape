import React, { useRef, useEffect } from 'react';

// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');

type PropsType = {
  className: string;
  option: any;
};

export default function(props: PropsType) {
  const chartsRef = useRef(null);
  useEffect(() => {
    const charts = echarts.init(chartsRef.current);
    charts.setOption(props.option);
  }, [props.option]);
  return <div className={props.className} ref={chartsRef} />;
}
