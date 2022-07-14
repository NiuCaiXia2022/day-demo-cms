import storage from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    tags: storage.getItem('tags') || [{ title: '控制台', path: '/index' }]
  },
  mutations: {
    addTag(state, tag) {
      const hasTag = state.tags.find(item => item.path === tag.path)
      if (!hasTag) {
        state.tags.push(tag)
        storage.setItem('tags', state.tags)
      }
    },
    removeTag(state, index) {
      state.tags.splice(index, 1)
      storage.setItem('tags', state.tags)
    },
    removeAllTag(state) {
      state.tags = [{ title: '控制台', path: '/index' }]
      storage.setItem('tags', state.tags)
    }
  },
  actions: {
    addTags({ commit }, tag) {
      commit('addTag', tag)
    },
    removeTags({ commit }, index) {
      commit('removeTag', index)
    },
    removeAllTags({ commit }) {
      commit('removeAllTag')
    }
  }
}
