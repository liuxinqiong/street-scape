import React, { useState, useRef } from 'react';
import styles from './HomeHeader.module.scss';
import { Select, Icon, Button, Modal, Upload, message } from 'antd';
import Dropdown from '../Dropdown/Dropdown';
import { classify, getPoints } from 'api/road';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  setClassifiedRoads,
  setClassifiedPointOverlays,
  setSelectedModel
} from 'store/root-action';
import {
  clearPointOverlays,
  addPointsOverlay,
  updatePointsOverlay,
  normalizeRoadsData
} from './HomeHeader.logic';
import { transformToById } from 'utils/helper';
import { useDistrict } from './hooks/district.hook';
import useModel from './hooks/useModel';

const { Option } = Select;

interface propsType {
  map: any;
  selectedModel: string;
  actions: {
    setClassifiedRoads: Function;
    setClassifiedPointOverlays: Function;
    setSelectedModel: Function;
  };
}

function HomeHeader(props: propsType) {
  const { districts, selectedDistrict, districtChange } = useDistrict(
    props.map
  );
  const [roads, setRoads] = useState<any>({ ids: [], byId: {} }); // 方便检索
  const [selectedRoadIds, setSelectedRoadIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false); // 获取街道信息
  const [visible, setVisible] = useState(false); // 上传 model 显影
  const [loadingClassify, setLoadingClassify] = useState(false); // 评估 loading

  const pointOverlayMapRef = useRef<any>(new Map());
  const roadLabelMapRef = useRef<any>(new Map());
  const prevSelectedRoadIdsRef = useRef<number[]>([]);

  function resetEmptyState() {
    const { existLabelsMap } = updatePointsOverlay(
      roads.byId,
      prevSelectedRoadIdsRef.current,
      [],
      props.map,
      pointOverlayMapRef.current,
      roadLabelMapRef.current
    );
    setSelectedRoadIds([]);
    roadLabelMapRef.current = existLabelsMap;
    prevSelectedRoadIdsRef.current = [];
    props.actions.setClassifiedRoads({});
    props.actions.setClassifiedPointOverlays([]);
  }

  function evaluate() {
    const { selectedModel } = props;
    if (!selectedModel) {
      message.error('请选择模型');
      return;
    }
    setLoadingClassify(true);
    classify(selectedModel, selectedRoadIds)
      .then(({ data }) => {
        const classifiedRoads: { [key: string]: any } = {};
        data.forEach(road => {
          // 分析后，多了 category 和 pic
          classifiedRoads[road.name] = { ...roads.byId[road.name], ...road };
        });
        const allRoadsById = {
          ...roads.byId,
          ...classifiedRoads
        };
        const { existLabelsMap, highLightOverlays } = updatePointsOverlay(
          allRoadsById,
          prevSelectedRoadIdsRef.current,
          selectedRoadIds,
          props.map,
          pointOverlayMapRef.current,
          roadLabelMapRef.current
        );
        roadLabelMapRef.current = existLabelsMap;
        prevSelectedRoadIdsRef.current = [...selectedRoadIds];
        props.actions.setClassifiedRoads(classifiedRoads);
        props.actions.setClassifiedPointOverlays(highLightOverlays);
        setLoadingClassify(false);
      })
      .catch(e => {
        setLoadingClassify(false);
      });
  }

  function getPointsFromArea() {
    setLoading(true);
    const center = props.map.getBounds().getCenter();
    // 重新获取新的路网信息，重置为空状态
    resetEmptyState();
    getPoints(center)
      .then(({ data }) => {
        const roads = normalizeRoadsData(data);
        const { ids, byId } = transformToById(roads);
        setRoads({
          ids,
          byId
        });
        // 移除旧点
        if (pointOverlayMapRef.current) {
          clearPointOverlays(props.map, pointOverlayMapRef.current);
        }
        pointOverlayMapRef.current = addPointsOverlay(props.map, roads);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
      });
  }

  const { uploadProps, handleUpload, fileList, uploading, models } = useModel(
    setVisible
  );

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
        <div>
          1. 判别模型 Discrimination Model
          <br />
          <Button
            type="link"
            className={styles.linkButton}
            onClick={() => {
              setVisible(true);
            }}
          >
            上传模型
          </Button>
        </div>
        <Select
          onSelect={value => {
            props.actions.setSelectedModel(value);
          }}
          placeholder="点击选择模型 Click to select model"
          className={`header-select ${styles.select}`}
          suffixIcon={<Icon type="caret-down" />}
        >
          {models.map(model => {
            return (
              <Option value={model} key={model} className="header-option">
                {model}
              </Option>
            );
          })}
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
          onSelect={districtChange}
          className={`header-select ${styles.select}`}
          suffixIcon={<Icon type="caret-down" />}
        >
          {districts.map((district: any) => {
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
          <Button
            type="link"
            onClick={getPointsFromArea}
            loading={loading}
            className={styles.linkButton}
          >
            获取线框内道路信息
          </Button>
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
            onChange={(value: any) => {
              setSelectedRoadIds(value);
            }}
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
                <Dropdown
                  clearAll={() => {
                    setSelectedRoadIds([]);
                  }}
                  selectAll={() => {
                    setSelectedRoadIds(roads.ids);
                  }}
                  evaluate={evaluate}
                  loading={loadingClassify}
                />
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
      <Modal
        title="上传模型"
        footer={null}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <Upload {...uploadProps} accept=".json,.npy">
          <Button>
            <Icon type="upload" /> 选择文件
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? '上传中' : '开始上传'}
        </Button>
      </Modal>
    </div>
  );
}

/* istanbul ignore next */
function mapStateToProps(state: any) {
  return {
    map: state.home.map,
    selectedModel: state.home.selectedModel
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(
      { setClassifiedRoads, setClassifiedPointOverlays, setSelectedModel },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeHeader);
