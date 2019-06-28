import React, { useEffect, useState, useRef } from 'react';
import styles from './HomeHeader.module.scss';
import { Select, Icon } from 'antd';
import Dropdown from './Dropdown';
import {
  getDistrictsByCity,
  getRoadsByDistrict,
  evalRoadsClassify
} from 'api/road';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Road } from 'models/Road';
import { PointOverlay } from 'utils/PointOverlay';
import {
  CategoryColors,
  DEFAULT_POINT_STYLE,
  HIGH_LIGHT_POINT_STYLE
} from 'constants/colors';
import { addStyle } from 'utils/dom';
import { setClassifiedRoads } from 'store/root-action';

declare const BMap: any;

const { Option } = Select;
const districts = getDistrictsByCity();

const findDistrictById: any = (id: number) =>
  districts.find(item => item.id === id);

function mapPanTo(map: any, lon: number, lat: number) {
  if (map) {
    map.panTo(new BMap.Point(lon, lat));
  }
}

function addPointsOverlay(map: any, roads: Road[]) {
  const overlayMap = new Map();
  map.clearOverlays();
  roads.forEach(road => {
    road.points.forEach(point => {
      const key = road.id + '-' + point.id;
      const pointOverlay = new PointOverlay(
        new BMap.Point(...point.coord),
        DEFAULT_POINT_STYLE
      );
      map.addOverlay(pointOverlay);
      overlayMap.set(key, pointOverlay);
    });
  });
  return overlayMap;
}

function updatePointsOverlay(
  map: any,
  overlays: Map<any, any>,
  roads: any,
  oldIds: any,
  newIds: any,
  roadLabelMap: any
) {
  oldIds.forEach((id: number) => {
    const road = roads.byId[id];
    road.points.forEach((point: any) => {
      const key = road.id + '-' + point.id;
      const div = overlays.get(key)._div;
      addStyle(div, DEFAULT_POINT_STYLE);
    });
    map.removeOverlay(roadLabelMap.get(id));
  });
  newIds.forEach((id: number) => {
    const road = roads.byId[id];
    let lonSum = 0;
    let latSum = 0;
    road.points.forEach((point: any) => {
      lonSum += point.coord[0];
      latSum += point.coord[1];
      const key = road.id + '-' + point.id;
      const div = overlays.get(key)._div;
      addStyle(div, {
        ...HIGH_LIGHT_POINT_STYLE,
        backgroundColor: CategoryColors[point.category[0]]
      });
    });
    // 添加文字标注
    const point = new BMap.Point(
      lonSum / road.points.length,
      latSum / road.points.length
    );
    const label = new BMap.Label(road.name, {
      position: point,
      offset: new BMap.Size(20, -20)
    });
    label.setStyle({
      color: 'white',
      backgroundColor: '#0000FE',
      border: 'none',
      padding: '2px 8px'
    });
    roadLabelMap.set(road.id, label);
    map.addOverlay(label);
  });
  return roadLabelMap;
}

function HomeHeader(props: any) {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [roads, setRoads] = useState<any>({ ids: [], byId: {} });
  const [selectedRoadIds, setSelectedRoadIds] = useState<number[]>([]);
  const pointOverlayMap = useRef<any>(new Map());
  const roadLabelMap = useRef<any>(new Map());

  function handleRoadSelectChange(newIds: number[]) {
    if (!newIds.length) {
      clearAll();
      return;
    }
    evalRoadsClassify(newIds).then(({ data }) => {
      const classifiedRoads: { [key: number]: any } = {};
      data.forEach(road => {
        // 分析后，多了 category 和 pic_id
        classifiedRoads[road.id] = { ...roads.byId[road.id], ...road };
      });
      const allRoads = {
        byId: {
          ...roads.byId,
          ...classifiedRoads
        }
      };
      roadLabelMap.current = updatePointsOverlay(
        props.map,
        pointOverlayMap.current,
        allRoads,
        selectedRoadIds,
        newIds,
        roadLabelMap.current
      );
      setSelectedRoadIds(newIds);
      props.actions.setClassifiedRoads(classifiedRoads);
    });
  }

  function districtSelectChange(value: number) {
    setSelectedDistrict(findDistrictById(value));
  }

  function roadSelectChange(value: any) {
    handleRoadSelectChange(value);
  }

  function clearAll() {
    roadLabelMap.current = updatePointsOverlay(
      props.map,
      pointOverlayMap.current,
      roads,
      selectedRoadIds,
      [],
      roadLabelMap.current
    );
    setSelectedRoadIds([]);
    props.actions.setClassifiedRoads({});
  }

  function selectAll() {
    handleRoadSelectChange(roads.ids);
  }

  useEffect(() => {
    if (!props.map) {
      return;
    }
    getRoadsByDistrict(selectedDistrict.code).then(({ data }) => {
      // array to byId
      const ids: Array<number> = [];
      const byId: any = {};
      data.forEach(road => {
        ids.push(road.id);
        byId[road.id] = road;
      });
      setRoads({
        ids,
        byId
      });
      pointOverlayMap.current = addPointsOverlay(props.map, data);
    });
    mapPanTo(props.map, selectedDistrict.lon, selectedDistrict.lat);
  }, [selectedDistrict, props.map]);

  return (
    <div className={styles.header}>
      <img
        className={styles.logo}
        src={require('../../../../assets/xk_logo.png')}
        alt=""
      />
      <div className={styles.info}>
        城市街景识别应用<span className={styles.beta}>beta 1.0</span>
        <br />
        StreetView Discrimination App
        <p className={styles.company}>
          由小库科技研发 Developed by XKool Technology
        </p>
      </div>
      <div className={styles.model}>
        <div>1. 判别模型 Discrimination Model</div>
        <Select
          defaultValue="1"
          className={`header-select ${styles.select}`}
          suffixIcon={<Icon type="caret-down" />}
        >
          <Option value="1" className="header-option">
            业态类型 Venue Category
          </Option>
        </Select>
      </div>
      <div className={styles.model}>
        <div className={styles.stepName}>
          2. 街道对象 Target Street
          <br />
          2.1 城市 City
        </div>
        <Select
          defaultValue="1"
          className={`header-select ${styles.select}`}
          suffixIcon={<Icon type="caret-down" />}
        >
          <Option value="1" className="header-option">
            上海 ShangHai
          </Option>
        </Select>
      </div>
      <div className={styles.model}>
        <div className={styles.stepName}>
          <span style={{ color: '#FFF' }}>2. 街道对象 Target Street</span>
          <br />
          2.2 区域 District
        </div>
        <Select
          value={selectedDistrict.id}
          onSelect={districtSelectChange}
          className={`header-select ${styles.select}`}
          suffixIcon={<Icon type="caret-down" />}
        >
          {districts.map(district => {
            return (
              <Option
                value={district.id}
                className="header-option"
                key={district.id}
              >
                {district.city_name + ' ' + district.en_name}
              </Option>
            );
          })}
        </Select>
      </div>
      <div className={styles.model}>
        <div className={styles.stepName}>
          <span style={{ color: '#FFF' }}>2. 街道对象 Target Street</span>
          <br />
          2.3 街道 Street
        </div>
        <div
          onMouseDown={(e: any) => {
            e.preventDefault();
          }}
        >
          <Select
            className={`header-select ${styles.selectLarge}`}
            placeholder="点击选择街道 Click to select Street"
            value={selectedRoadIds}
            onChange={roadSelectChange}
            mode="multiple"
            maxTagCount={2}
            notFoundContent="暂无数据"
            dropdownClassName="header-dropdown"
            dropdownStyle={{
              backgroundColor: 'transparent',
              boxShadow: 'none'
            }}
            dropdownRender={menu => (
              <>
                {menu}
                <Dropdown clearAll={clearAll} selectAll={selectAll} />
              </>
            )}
          >
            {roads.ids.map((id: number) => {
              const road = roads.byId[id];
              return (
                <Option value={road.id} className="header-option" key={road.id}>
                  {road.name}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
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
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators({ setClassifiedRoads }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeHeader);
