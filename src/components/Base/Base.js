import Vue from 'vue'
import { getAll as getCourse } from '@/api/base/course'

export default class Base {
  constructor(base) {
    this.base = base
    console.log('---->constructor(base):' + base)
  }

  async init(names, completeCallback) {
    console.log('---->init(names):' + names)
    if (names === undefined || name === null) {
      throw new Error('need Base names')
    }
    const ps = []
    names.forEach(n => {
      Vue.set(this.base.base, n, {})
      Vue.set(this.base.name, n, {})
      Vue.set(this.base, n, [])
      console.log('---->this.base.base:' + this.base.base)
      console.log('---->this.base.name:' + this.base.name)
      console.log('---->this.base:' + this.base)
      ps.push(getCourse(n).then(data => {
        console.log('---->getCourse -> data:' + data)
        this.base[n].splice(0, 0, ...data.content)
        console.log('---->this.base[n].splice(0, 0, ...data.content):' + this.base[n])
        data.content.forEach(d => {
          Vue.set(this.base.base[n], d.courseId, d)
          console.log('---->this.base.base[n]:' + this.base.base[n])
          console.log('---->d.courseId:' + d.courseId)
          console.log('---->d:' + d)
          Vue.set(this.base.name[n], d.courseId, d.name)
          console.log('---->this.base.name[n]:' + this.base.name[n])
          console.log('---->d.name:' + d.name)
        })
      }))
    })
    await Promise.all(ps)
    completeCallback()
  }
}
