export interface Road {
  id: number;
  name: string;
  points: Point[];
}

export interface Point {
  coord: [number, number];
  id: number;
  category: [number, string];
  pic_id: string;
}

export interface ClassifiedRoadsType {
  [key: number]: Road;
}
