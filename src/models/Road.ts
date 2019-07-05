export interface Road {
  id: number;
  name: string;
  points: Point[];
}

export interface Point {
  coord: [number, number];
  id: number;
  category: [number, string];
  pic: number;
  district: string;
  pics: number[];
}

export interface ClassifiedRoadsType {
  [key: number]: Road;
}
