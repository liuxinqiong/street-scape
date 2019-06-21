import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import styles from './MapControl.module.scss';

type Props = {
  map: any;
};

class MapControl extends React.Component<Props> {
  zoomIn() {
    this.props.map.zoomIn();
  }

  zoomOut() {
    this.props.map.zoomOut();
  }

  setViewport() {}

  render() {
    const { map } = this.props;
    if (!map) {
      return null;
    }
    return (
      <div className={styles.control}>
        <Icon
          type="minus-circle"
          className={styles.icon}
          onClick={this.zoomOut.bind(this)}
        />
        <Icon
          type="plus-circle"
          className={styles.icon}
          onClick={this.zoomIn.bind(this)}
        />
        <Icon
          type="fullscreen-exit"
          className={styles.icon}
          onClick={this.setViewport.bind(this)}
        />
      </div>
    );
  }
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
