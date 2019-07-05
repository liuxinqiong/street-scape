import { CategoryColors } from 'constants/colors';
import { ClassifiedRoadsType } from 'models/Road';

// 根据已分析道路信息组装 Echarts 需要的数据
export function getEchartsOption(roads: ClassifiedRoadsType) {
  const categoryMap = new Map<number, any>();
  const ids = Object.keys(roads);
  let totalCount = 0;
  ids.forEach((id: any) => {
    const road = roads[id];
    totalCount += road.points.length;
    road.points.forEach(point => {
      const [categoryId, categoryName] = point.category;
      const item = categoryMap.get(categoryId);
      if (item) {
        item.count++;
      } else {
        categoryMap.set(categoryId, {
          categoryId: categoryId,
          categoryName: categoryName,
          count: 1
        });
      }
    });
  });
  const categoryNames = [];
  const data = [];
  for (const category of categoryMap.values()) {
    categoryNames.push(category.categoryName);
    data.push({
      value: category.count / totalCount,
      itemStyle: {
        color: CategoryColors[category.categoryId]
      }
    });
  }
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: categoryNames,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: '60%',
        data: data
      }
    ]
  };
}

// 组装 table 需要的数据格式
export function normalizeTableData(
  roads: ClassifiedRoadsType,
  option: any = {}
) {
  const { colClassName, render } = option;
  // 用于确定所有道路共出现过哪些类别的并集，作为 table 的列
  const allCategoryIds = new Map<number, any>();
  // 类别的并集
  const roadsCategoryMap = new Map<number, any>();
  const ids = Object.keys(roads);
  ids.forEach((id: any) => {
    const road = roads[id];
    const roadCategory = new Map();
    road.points.forEach(point => {
      const [categoryId, categoryName] = point.category;
      allCategoryIds.set(categoryId, {
        categoryId,
        categoryName,
        color: CategoryColors[categoryId]
      });
      const category = roadCategory.get(categoryId);
      if (category) {
        category.count++;
      } else {
        roadCategory.set(categoryId, {
          categoryId,
          categoryName,
          color: CategoryColors[categoryId],
          count: 1
        });
      }
    });
    roadsCategoryMap.set(road.id, roadCategory);
  });
  const columns: any[] = [
    {
      title: '道路名称',
      dataIndex: 'name',
      key: 'name',
      className: colClassName
    }
  ];
  for (const id of allCategoryIds.keys()) {
    const category = allCategoryIds.get(id);
    columns.push({
      title: category.categoryName,
      dataIndex: id,
      key: '__col__' + id,
      className: colClassName,
      sortDirections: ['descend', 'ascend'],
      sorter: (a: any, b: any) => a[id] - b[id],
      render: (percent: number) => render(percent, category.color)
    });
  }
  const dataSource: any[] = [];
  for (const roadId of roadsCategoryMap.keys()) {
    const row: any = { key: roadId };
    const roadCategory = roadsCategoryMap.get(roadId);
    row.name = roads[roadId as any].name;
    for (const id of allCategoryIds.keys()) {
      const cate = roadCategory.get(id);
      if (cate) {
        row[id] = cate.count / roads[roadId as any].points.length;
      } else {
        row[id] = 0;
      }
    }
    dataSource.push(row);
  }
  return {
    columns,
    dataSource
  };
}
