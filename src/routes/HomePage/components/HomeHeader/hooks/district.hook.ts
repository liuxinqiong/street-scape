import { useState, useEffect, useMemo } from 'react';

import { mapPanTo, findDistrictById } from '../HomeHeader.logic';
import { getDistrictsByCity } from 'api/road';

export function useDistrict(map: any) {
  const districts = useMemo(() => {
    return getDistrictsByCity();
  }, []);

  const [selectedDistrict, setSelectedDistrict] = useState(districts[0]);

  useEffect(() => {
    if (!map) {
      return;
    }
    mapPanTo(map, selectedDistrict.lon, selectedDistrict.lat);
  }, [selectedDistrict, map]);

  function districtChange(value: number) {
    setSelectedDistrict(findDistrictById(districts, value));
  }

  return {
    districts,
    selectedDistrict,
    districtChange
  };
}
