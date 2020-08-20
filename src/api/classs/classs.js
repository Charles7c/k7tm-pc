import request from '@/utils/request'

export function getAllClass(id) {
  const params = {
    sort: ['graduateTime,asc', 'createTime,desc'],
    page: 0,
    size: 9999,
    id
  }
  return request({
    url: 'api/classs',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'api/classs',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/classs/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/classs',
    method: 'put',
    data
  })
}

export default { add, edit, del }
