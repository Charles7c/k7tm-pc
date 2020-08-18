import Base from './Base'

const install = function(Vue) {
  Vue.mixin({
    data() {
      if (this.$options.bases instanceof Array) {
        const base = {
          base: {},
          name: {}
        }
        return {
          base
        }
      }
      return {}
    },
    created() {
      if (this.$options.bases instanceof Array) {
        new Base(this.base).init(this.$options.bases, () => {
          this.$nextTick(() => {
            this.$emit('BaseReady')
          })
        })
      }
    }
  })
}

export default { install }
