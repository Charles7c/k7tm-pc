import Vue from 'vue'
import { getBase } from '@/api/base/index'

export default class Base {
  constructor(base) {
    this.base = base
  }

  async init(names, completeCallback) {
    if (names === undefined || name === null) {
      throw new Error('need Base names')
    }
    const ps = []
    names.forEach(n => {
      Vue.set(this.base.base, n, {})
      Vue.set(this.base.name, n, {})
      Vue.set(this.base, n, [])
      // 判断不同基础配置
      ps.push(getBase(n).then(data => {
        this.base[n].splice(0, 0, ...data.content)
        data.content.forEach(d => {
          Vue.set(this.base.base[n], d.id, d)
          Vue.set(this.base.name[n], d.id, d.name)
        })
      }))
    })
    await Promise.all(ps)
    completeCallback()
  }
}
