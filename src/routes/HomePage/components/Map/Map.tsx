import React, { useEffect, useRef } from 'react';
import styles from './Map.module.scss';
import BMapStyleJson from './BMapStyle';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setMapInstance } from 'store/root-action';
import { DEFAULT_CENTER_POINT, DEFAULT_ZOOM } from 'constants/app';
import { MAP_CIRCLE_STYLE } from 'constants/styles';

declare const BMap: any;

type PropsType = {
  actions: {
    setMapInstance: Function;
  };
};

// function getPolygonPointsByBounds(bounds: any) {
//   const right_top = bounds.getNorthEast();
//   const left_bottom = bounds.getSouthWest();
//   const left_top = new BMap.Point(left_bottom.lng, right_top.lat);
//   const right_bottom = new BMap.Point(right_top.lng, left_bottom.lat);
//   return [left_top, right_top, right_bottom, left_bottom];
// }

// function createPolygonByCircleBounds(bounds: any) {
//   const points = getPolygonPointsByBounds(bounds);
//   const rectangle = new BMap.Polygon(points, {
//     strokeColor: 'blue',
//     strokeWeight: 2,
//     strokeOpacity: 0.5,
//     strokeStyle: 'dashed',
//     fillColor: 'transparent'
//   });
//   return rectangle;
// }

function Map(props: PropsType) {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new BMap.Map(mapRef.current);
    map.centerAndZoom(new BMap.Point(...DEFAULT_CENTER_POINT), DEFAULT_ZOOM);
    map.setMapStyleV2({ styleJson: BMapStyleJson });
    map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
    props.actions.setMapInstance(map);

    const circle = new BMap.Circle(
      map.getBounds().getCenter(),
      1000,
      MAP_CIRCLE_STYLE
    );
    map.addOverlay(circle);
    map.addEventListener('moveend', function(evt: any) {
      circle.setCenter(map.getBounds().getCenter());
    });

    return () => {
      map.removeEventListener('moveend');
    };
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
