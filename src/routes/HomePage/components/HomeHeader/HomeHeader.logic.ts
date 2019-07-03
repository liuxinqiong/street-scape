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

export function clearPointOverlays(
  map: any,
  pointOverlaysMap: Map<any, PointOverlay>
) {
  for (const pointOverlay of pointOverlaysMap.values()) {
    map.removeOverlay(pointOverlay);
  }
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
      const overlays = existOverlaysMap.get(key);
      if (overlays) {
        const div = overlays._div;
        addStyle(div, DEFAULT_POINT_STYLE);
      }
    });
    map.removeOverlay(existLabelsMap.get(id));
  });
  // 添加新点
  const highLightOverlays: any = [];
  newIds.forEach((id: number) => {
    const road = roadsById[id];
    let lonSum = 0;
    let latSum = 0;
    let count = 0;
    road.points.forEach((point: any) => {
      const key = road.id + '-' + point.id;
      // 路实际情况可能超出范围
      const overlay = existOverlaysMap.get(key);
      // 有些 point 没有对应街景分析
      if (overlay && point.category) {
        lonSum += point.coord[0];
        latSum += point.coord[1];
        count++;
        const div = overlay._div;
        addStyle(div, {
          ...HIGH_LIGHT_POINT_STYLE,
          backgroundColor: CategoryColors[point.category[0]]
        });
        highLightOverlays.push(overlay);
      }
    });
    // 添加文字标注，暂定粗略取平均值
    const coord = [lonSum / count, latSum / count];
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

export function normalizeRoadsData(points: any[]): Road[] {
  const byName: any = {};
  points.forEach((point: any) => {
    const roadName: string = point.name;
    const purePoint = {
      coord: point.coord,
      id: point.id
    };
    if (byName[roadName]) {
      byName[roadName].points.push(purePoint);
    } else {
      byName[roadName] = {
        id: roadName,
        name: roadName,
        points: [purePoint]
      };
    }
  });
  return Object.values(byName);
}

export function getFileFormat(fileUrl: string) {
  const dotIndex = fileUrl.lastIndexOf('.');
  return fileUrl.substring(dotIndex);
}

function getFileName(fileUrl: string) {
  const dotIndex = fileUrl.lastIndexOf('.');
  return fileUrl.substring(0, dotIndex);
}

export function validateUploadModelFiles(fileUrls: string[]) {
  if (fileUrls.length !== 2) {
    return false;
  }
  const typeList = ['.json', '.npy'];
  const fileNames: string[] = [];
  fileUrls.forEach(fileUrl => {
    const format = getFileFormat(fileUrl);
    fileNames.push(getFileName(fileUrl));
    const index = typeList.findIndex(item => item === format);
    if (index !== -1) {
      typeList.splice(index, 1);
    }
  });
  if (fileNames[0] !== fileNames[1]) {
    return false;
  }
  return typeList.length === 0;
}
