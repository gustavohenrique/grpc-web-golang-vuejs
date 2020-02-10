import Vue from 'vue'
import bus from '../libs/bus'

Vue.prototype.$publish = bus.publish
Vue.prototype.$subscribe = bus.subscribe
