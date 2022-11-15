import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state: {
    debtors: [],
  },
  getters: {},
  actions: {
    async fetchDebtors({ commit }) {
      try {
        const data = await axios.get('http://localhost:3000/debtors')
        commit('SET_DEBTORS', data.data)
      }
      catch (error) {
        alert(error)
        console.log(error)
      }
    },
  },
  mutations: {
    SET_DEBTORS(state, debtors) {
      state.debtors = debtors
    },
    REMOVE_ROW(state, id) {
      axios.delete('http://localhost:3000/debtors/' + id)
      .then( result => {
        console.log(result);
      })
      .then(
        window.location.reload()
      )
    },
  }
})