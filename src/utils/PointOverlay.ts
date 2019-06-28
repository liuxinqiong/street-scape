import { addStyle } from './dom';

declare const BMap: any;

const Overlay = BMap.Overlay;

export class PointOverlay extends Overlay {
  private _point: any;
  private _map: any;
  private _div: any;
  private _style: any;
  constructor(point: any, style: any) {
    super();
    this._point = point;
    this._style = style;
  }

  initialize(map: any) {
    this._map = map;
    const div = (this._div = document.createElement('div'));
    const style = {
      position: 'absolute',
      zIndex: BMap.Overlay.getZIndex(this._point.lat),
      borderRadius: '50%',
      ...this._style
    };
    addStyle(div, style);
    map.getPanes().labelPane.appendChild(div);
    return div;
  }

  draw() {
    const map = this._map;
    const pixel = map.pointToOverlayPixel(this._point);
    addStyle(this._div, {
      left: pixel.x + 'px',
      top: pixel.y + 'px'
    });
  }
}
