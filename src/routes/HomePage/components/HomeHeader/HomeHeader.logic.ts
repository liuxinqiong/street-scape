import { District } from 'models/District';
import { DEFAULT_POINT_STYLE, HIGH_LIGHT_POINT_STYLE } from 'constants/styles';
import { PointOverlay } from 'models/PointOverlay';
import { Road } from 'models/Road';
import { addStyle } from 'utils/dom';
import { CategoryColors } from 'constants/colors';

declare const BMap: any;

export function mapPanTo(map: any, lon: number, lat: number) {
  map.panTo(new BMap.Point(lon, lat));
}

export function findDistrictById(districts: District[], id: number): any {
  return districts.find((item: District) => item.id === id);
}

// 返回的 map 方便日后进行高亮处理
export function addPointsOverlay(map: any, roads: Road[]) {
  const overlayMap = new Map<string, PointOverlay>();
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

export function updatePointsOverlay(
  roadsById: any,
  oldIds: number[],
  newIds: number[],
  map: any,
  existOverlaysMap: Map<string, any>,
  existLabelsMap: Map<number, any>
) {
  // 删除旧点
  oldIds.forEach((id: number) => {
    const road = roadsById[id];
    road.points.forEach((point: any) => {
      const key = road.id + '-' + point.id;
      const div = existOverlaysMap.get(key)._div;
      addStyle(div, DEFAULT_POINT_STYLE);
    });
    map.removeOverlay(existLabelsMap.get(id));
  });
  // 添加新点
  const highLightOverlays: any = [];
  newIds.forEach((id: number) => {
    const road = roadsById[id];
    let lonSum = 0;
    let latSum = 0;
    road.points.forEach((point: any) => {
      lonSum += point.coord[0];
      latSum += point.coord[1];
      const key = road.id + '-' + point.id;
      const overlay = existOverlaysMap.get(key);
      const div = overlay._div;
      addStyle(div, {
        ...HIGH_LIGHT_POINT_STYLE,
        backgroundColor: CategoryColors[point.category[0]]
      });
      highLightOverlays.push(overlay);
    });
    // 添加文字标注，暂定粗略取平均值
    const coord = [lonSum / road.points.length, latSum / road.points.length];
    const label = createTextLabel(road.name, coord);
    existLabelsMap.set(road.id, label);
    map.addOverlay(label);
  });
  return {
    existLabelsMap,
    highLightOverlays
  };
}

function createTextLabel(text: string, coord: number[]) {
  const point = new BMap.Point(...coord);
  const label = new BMap.Label(text, {
    position: point,
    offset: new BMap.Size(20, -20)
  });
  label.setStyle({
    color: 'white',
    backgroundColor: '#0000FE',
    border: 'none',
    padding: '2px 8px'
  });
  return label;
}
