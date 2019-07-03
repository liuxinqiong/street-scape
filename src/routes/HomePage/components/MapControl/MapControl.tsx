import React from 'react';
import { connect } from 'react-redux';
import styles from './MapControl.module.scss';
import { PointOverlay } from 'models/PointOverlay';

type Props = {
  map: any;
  classifiedPointOverlays: PointOverlay[];
};

function MapControl(props: Props) {
  const { map } = props;
  if (!map) {
    return null;
  }
  return (
    <div className={styles.control}>
      <img
        src={require('assets/zoomout.png')}
        alt=""
        className={styles.icon}
        onClick={() => {
          map.zoomOut();
        }}
      />
      <img
        src={require('assets/zoomin.png')}
        alt=""
        className={styles.icon}
        onClick={() => {
          map.zoomIn();
        }}
      />
      <img
        src={require('assets/zoomauto.png')}
        alt=""
        className={styles.icon}
        onClick={() => {
          map.setViewport(props.classifiedPointOverlays);
        }}
      />
    </div>
  );
}

/* istanbul ignore next */
function mapStateToProps(state: any) {
  return {
    map: state.home.map,
    classifiedPointOverlays: state.home.classifiedPointOverlays
  };
}

/* istanbul ignore next */
function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapControl);
