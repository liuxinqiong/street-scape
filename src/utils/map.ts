declare const BMap: any;

export class XkMap {
  private map: any;
  constructor(map: any) {
    this.map = map;
  }

  panTo(lon: number, lat: number) {
    this.map.panTo(new BMap.Point(lon, lat));
  }
}
