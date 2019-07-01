import React, { useEffect, useState, useRef } from 'react';
import styles from './HomeHeader.module.scss';
import { Select, Icon } from 'antd';
import Dropdown from '../Dropdown/Dropdown';
import {
  getDistrictsByCity,
  getRoadsByDistrict,
  evalRoadsClassify
} from 'api/road';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  setClassifiedRoads,
  setClassifiedPointOverlays
} from 'store/root-action';
import {
  mapPanTo,
  findDistrictById,
  addPointsOverlay,
  updatePointsOverlay
} from './HomeHeader.logic';
import { transformToById } from 'utils/helper';

const { Option } = Select;
const districts = getDistrictsByCity(); // mock 数据

interface propsType {
  map: any;
  actions: {
    setClassifiedRoads: Function;
    setClassifiedPointOverlays: Function;
  };
}

function HomeHeader(props: propsType) {
  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);
  const [roads, setRoads] = useState<any>({ ids: [], byId: {} }); // 方便检索
  const [selectedRoadIds, setSelectedRoadIds] = useState<number[]>([]);
  const pointOverlayMapRef = useRef<any>(new Map());
  const roadLabelMapRef = useRef<any>(new Map());

  function handleRoadSelectChange(newIds: number[]) {
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
      const { existLabelsMap, highLightOverlays } = updatePointsOverlay(
        allRoads.byId,
        selectedRoadIds,
        newIds,
        props.map,
        pointOverlayMapRef.current,
        roadLabelMapRef.current
      );
      roadLabelMapRef.current = existLabelsMap;
      setSelectedRoadIds(newIds);
      props.actions.setClassifiedRoads(classifiedRoads);
      props.actions.setClassifiedPointOverlays(highLightOverlays);
    });
  }

  function districtSelectChange(value: number) {
    setSelectedDistrict(findDistrictById(districts, value));
  }

  function roadSelectChange(value: any) {
    if (!value.length) {
      clearAll();
      return;
    }
    handleRoadSelectChange(value);
  }

  function clearAll() {
    const { existLabelsMap } = updatePointsOverlay(
      roads.byId,
      selectedRoadIds,
      [],
      props.map,
      pointOverlayMapRef.current,
      roadLabelMapRef.current
    );
    roadLabelMapRef.current = existLabelsMap;
    setSelectedRoadIds([]);
    props.actions.setClassifiedRoads({});
    props.actions.setClassifiedPointOverlays([]);
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
      const { ids, byId } = transformToById(data);
      setRoads({
        ids,
        byId
      });
      pointOverlayMapRef.current = addPointsOverlay(props.map, data);
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
    actions: bindActionCreators(
      { setClassifiedRoads, setClassifiedPointOverlays },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeHeader);
