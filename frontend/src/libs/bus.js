import Vue from 'vue'
const bus = new Vue()

export default {
  publish: (evt, ...args) => {
    bus.$emit(evt, ...args)
  },
  subscribe: (evt, callback) => {
    if (typeof evt === 'string') {
      bus.$on(evt, callback)
    }
    if (Array.isArray(evt)) {
      for (const e of evt) {
        bus.$on(e, callback)
      }
    }
  }
}
