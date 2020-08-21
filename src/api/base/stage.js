import request from '@/utils/request'

export function getAll() {
  return request({
    url: 'api/stage',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api/stage',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/stage/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/stage',
    method: 'put',
    data
  })
}

export default { add, edit, del }
