import { AxiosPromise } from 'axios';
import axiosInstance from './axios';
import { ROADS, ROAD_CLASSIFY } from './url';
import { districts } from './mock';
import { District } from 'models/District';
import { Road } from 'models/Road';

export function getRoadsByDistrict(
  districtName: string
): AxiosPromise<Array<Road>> {
  return axiosInstance.get(ROADS(districtName));
}

export function getDistrictsByCity(): District[] {
  return districts;
}

export function evalRoadsClassify(
  roadIds: Array<number>
): AxiosPromise<Array<Road>> {
  return axiosInstance.post(ROAD_CLASSIFY, {
    ids: roadIds
  });
}
