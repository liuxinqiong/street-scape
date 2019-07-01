import { Road } from 'models/Road';
import { StreetView } from 'models/StreeView';
import { CategoryColors } from 'constants/colors';

export function normalizeViewData(road: Road) {
  if (!road) {
    return [];
  }
  const categoryMap = new Map<number, StreetView[]>();
  // 按类别分组显示，因为本身数据无法保证顺序
  road.points.forEach(point => {
    const categoryId = point.category[0];
    const category = categoryMap.get(categoryId);
    if (category) {
      category.push(new StreetView(point.id, categoryId, point.pic_id));
    } else {
      categoryMap.set(categoryId, [
        new StreetView(point.id, categoryId, point.pic_id)
      ]);
    }
  });
  let result: StreetView[] = [];
  for (const categoryStreetViews of categoryMap.values()) {
    result = result.concat(categoryStreetViews);
  }
  return result;
}

export function normalizeCategoryData(road: Road) {
  if (!road) {
    return [];
  }
  const category: any = {};
  road.points.forEach(point => {
    const [categoryId, categoryName] = point.category;
    if (category[categoryId]) {
      category[categoryId].count++;
    } else {
      category[categoryId] = {
        id: categoryId,
        name: categoryName,
        color: CategoryColors[categoryId],
        count: 1
      };
    }
  });
  return Object.values(category);
}

export function findPointById(road: Road, id: number) {
  return road.points.find(point => point.id === id);
}
