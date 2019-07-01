export function transformToById(list: any[]) {
  const ids: number[] | string[] = [];
  const byId: any = {};
  list.forEach(item => {
    ids.push(item.id);
    byId[item.id] = item;
  });
  return { ids, byId };
}
