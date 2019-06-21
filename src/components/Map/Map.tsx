import React from 'react';
import styles from './Map.module.scss';
import BMapStyleJson from './BMapStyle';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setMapInstance } from '../../store/root-action';
import MapControl from './MapControl';

declare const BMap: any;

type PropsType = {
  actions: {
    setMapInstance: Function;
  };
};

class Map extends React.Component<PropsType, {}> {
  componentDidMount() {
    const map = new BMap.Map('map');
    map.centerAndZoom(new BMap.Point(114.07, 22.62), 16);
    map.setMapStyleV2({ styleJson: BMapStyleJson });
    this.props.actions.setMapInstance(map);
  }
  render() {
    return (
      <>
        <div id="map" className={styles.map} />
        <MapControl />
      </>
    );
  }
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
