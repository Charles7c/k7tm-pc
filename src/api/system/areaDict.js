import request from '@/utils/request'

export function getAreaDict(parentId) {
  // 做假数据
  if (parentId === null || parentId === '' || parentId === undefined) { parentId = 999 }
  const params = {
    sort: 'sort,asc',
    page: 0,
    size: 9999,
    parentId
  }
  return request({
    url: 'api/areaDict',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/areaDict',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/areaDict/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/areaDict',
    method: 'put',
    data
  })
}

export default { add, edit, del }
