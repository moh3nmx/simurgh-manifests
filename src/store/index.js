import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    permission: {
      delete: false,
      view: false,
      draft: false,
      publish: false,
      enrich: false
    }
  },
  getters: {
  },
  mutations: {
    setPermissions(state, permission) {
      state.permission.delete = permission.delete
      state.permission.view = permission.view
      state.permission.draft = permission.draft
      state.permission.publish = permission.publish
      state.permission.enrich = permission.enrich
    }
  },
  actions: {
  },
  modules: {
  }
})
