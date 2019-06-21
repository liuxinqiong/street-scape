import React from 'react';
import styles from './HomeHeader.module.scss';
import { Select, Icon } from 'antd';
import Dropdown from './Dropdown';

const { Option } = Select;

class HomeHeader extends React.Component {
  render() {
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
              业态类型1 Venue Category
            </Option>
            <Option value="2" className="header-option">
              业态类型2 Venue Category
            </Option>
            <Option value="3" className="header-option">
              业态类型3 Venue Category
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
            defaultValue="4"
            className={`header-select ${styles.select}`}
            suffixIcon={<Icon type="caret-down" />}
          >
            <Option value="1" className="header-option">
              北京 BeiJing
            </Option>
            <Option value="2" className="header-option">
              上海 ShangHai
            </Option>
            <Option value="3" className="header-option">
              广州 GuangZhou
            </Option>
            <Option value="4" className="header-option">
              深圳 ShenZhen
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
            defaultValue="1"
            className={`header-select ${styles.select}`}
            suffixIcon={<Icon type="caret-down" />}
          >
            <Option value="1" className="header-option">
              南山 NanShan District
            </Option>
            <Option value="2" className="header-option">
              福田 FuTian District
            </Option>
            <Option value="3" className="header-option">
              宝安 BaoAn District
            </Option>
            <Option value="4" className="header-option">
              龙华 LongHua District
            </Option>
          </Select>
        </div>
        <div className={styles.model}>
          <div className={styles.stepName}>
            <span style={{ color: '#FFF' }}>2. 街道对象 Target Street</span>
            <br />
            2.3 街道 Street
          </div>
          <Select
            className={`header-select ${styles.selectLarge}`}
            placeholder="点击选择街道 Click to select Street"
            mode="multiple"
            maxTagCount={2}
            dropdownClassName="header-dropdown"
            dropdownStyle={{
              backgroundColor: 'transparent',
              boxShadow: 'none'
            }}
            dropdownRender={menu => (
              <>
                {menu}
                <Dropdown />
              </>
            )}
          >
            <Option value="1" className="header-option">
              南山 NanShan District
            </Option>
            <Option value="2" className="header-option">
              福田 FuTian District
            </Option>
            <Option value="3" className="header-option">
              宝安 BaoAn District
            </Option>
            <Option value="4" className="header-option">
              龙华 LongHua District
            </Option>
            <Option value="5" className="header-option">
              南山 NanShan District
            </Option>
            <Option value="6" className="header-option">
              福田 FuTian District
            </Option>
            <Option value="7" className="header-option">
              宝安 BaoAn District
            </Option>
            <Option value="8" className="header-option">
              龙华 LongHua District
            </Option>
            <Option value="9" className="header-option">
              南山 NanShan District
            </Option>
            <Option value="10" className="header-option">
              福田 FuTian District
            </Option>
            <Option value="11" className="header-option">
              宝安 BaoAn District
            </Option>
            <Option value="12" className="header-option">
              龙华 LongHua District
            </Option>
            <Option value="13" className="header-option">
              南山 NanShan District
            </Option>
            <Option value="14" className="header-option">
              福田 FuTian District
            </Option>
            <Option value="15" className="header-option">
              宝安 BaoAn District
            </Option>
            <Option value="16" className="header-option">
              龙华 LongHua District
            </Option>
          </Select>
        </div>
      </div>
    );
  }
}

export default HomeHeader;
