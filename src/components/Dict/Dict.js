import Vue from 'vue'
import { get as getDictDetail } from '@/api/system/dictDetail'

export default class Dict {
  constructor(dict) {
    this.dict = dict
    console.log('---->constructor(dict):' + dict)
  }

  async init(names, completeCallback) {
    console.log('---->init(names):' + names)
    if (names === undefined || name === null) {
      throw new Error('need Dict names')
    }
    const ps = []
    names.forEach(n => {
      Vue.set(this.dict.dict, n, {})
      Vue.set(this.dict.label, n, {})
      Vue.set(this.dict, n, [])
      console.log('---->this.dict.dict:' + this.dict.dict)
      console.log('---->this.dict.label:' + this.dict.label)
      console.log('---->this.dict:' + this.dict)
      ps.push(getDictDetail(n).then(data => {
        console.log('---->getDictDetail -> data:' + data)
        this.dict[n].splice(0, 0, ...data.content)
        console.log('---->this.dict[n].splice(0, 0, ...data.content):' + this.dict[n])
        data.content.forEach(d => {
          Vue.set(this.dict.dict[n], d.value, d)
          console.log('---->this.dict.dict[n]:' + this.dict.dict[n])
          console.log('---->d.value:' + d.value)
          console.log('---->d:' + d)
          Vue.set(this.dict.label[n], d.value, d.label)
          console.log('---->this.dict.label[n]:' + this.dict.label[n])
          console.log('---->d.label:' + d.label)
        })
      }))
    })
    await Promise.all(ps)
    completeCallback()
  }
}
