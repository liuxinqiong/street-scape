import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import styles from './MapControl.module.scss';

type Props = {
  map: any;
};

function MapControl(props: Props) {
  const { map } = props;
  if (!map) {
    return null;
  }
  return (
    <div className={styles.control}>
      <Icon
        type="minus-circle"
        theme="filled"
        className={styles.icon}
        onClick={() => {
          map.zoomOut();
        }}
      />
      <Icon
        type="plus-circle"
        className={styles.icon}
        theme="filled"
        onClick={() => {
          map.zoomIn();
        }}
      />
      <Icon type="fullscreen-exit" className={styles.icon} />
    </div>
  );
}

/* istanbul ignore next */
function mapStateToProps(state: any) {
  return {
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
)(MapControl);
