import { AxiosPromise } from 'axios';
import axiosInstance from './axios';
import {
  ROADS,
  ROAD_CLASSIFY,
  GET_POINT,
  CLASSIFY,
  UPLOAD,
  FETCH_FILES,
  CORRELATION_MATRIX
} from './url';
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

export function getPoints(params: any) {
  return axiosInstance.get(GET_POINT, { params });
}

export function classify(model: string, ids: any): AxiosPromise<Array<Road>> {
  return axiosInstance.post(CLASSIFY, { data: ids, model });
}

export function uploadModel(formData: any) {
  return axiosInstance.post(UPLOAD, formData);
}

export function getModels() {
  return axiosInstance.get(FETCH_FILES);
}

export function correlationMatrix(model: string, ids: any) {
  return axiosInstance.post(CORRELATION_MATRIX, { data: ids, model });
}
