import React, { useEffect, useRef } from 'react';
import styles from './Map.module.scss';
import BMapStyleJson from './BMapStyle';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setMapInstance } from 'store/root-action';
import { DEFAULT_CENTER_POINT, DEFAULT_ZOOM } from 'constants/app';

declare const BMap: any;

type PropsType = {
  actions: {
    setMapInstance: Function;
  };
};

function Map(props: PropsType) {
  const mapRef = useRef(null);
  useEffect(() => {
    const map = new BMap.Map(mapRef.current);
    map.centerAndZoom(new BMap.Point(...DEFAULT_CENTER_POINT), DEFAULT_ZOOM);
    map.setMapStyleV2({ styleJson: BMapStyleJson });
    map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
    props.actions.setMapInstance(map);

    const circle = new BMap.Circle(map.getBounds().getCenter(), 2000, {
      strokeColor: 'blue',
      fillColor: 'transparent',
      strokeWeight: 2,
      strokeOpacity: 0.5
    });
    map.addOverlay(circle);
    map.addEventListener('zoomend', function(evt: any) {
      circle.setCenter(map.getBounds().getCenter());
    });
    map.addEventListener('moveend', function(evt: any) {
      circle.setCenter(map.getBounds().getCenter());
    });
  }, [props.actions]);
  return <div ref={mapRef} className={styles.map} />;
}

/* istanbul ignore next */
function mapStateToProps(state: any) {
  return {};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators({ setMapInstance }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
