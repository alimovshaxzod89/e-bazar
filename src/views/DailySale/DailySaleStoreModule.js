import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state: {
    dailysales: [],
    products: [],
  },
  getters: {},
  actions: {
    async fetchDailySale({ commit }) {
      try {
        const data = await axios.get('http://localhost:3000/dailysales')
        commit('SET_DAILYSALE', data.data)
      }
      catch (error) {
        alert(error)
        console.log(error)
      }
    },

    async fetchProducts({ commit }) {
      try {
        const data = await axios.get('http://localhost:3000/products')
        commit('SET_PRODUCTS', data.data)
      }
      catch (error) {
        alert(error)
        console.log(error)
      }
    },
  },
  mutations: {
    SET_DAILYSALE(state, dailysales) {
      state.dailysales = dailysales
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    REMOVE_ROW(state, id) {
      axios.delete('http://localhost:3000/dailysales/' + id)
      .then( result => {
        console.log(result);
      })
      .then(
        window.location.reload()
      )
    },
    REMOVE_PRODUCT_ROW(state, id) {
      axios.delete('http://localhost:3000/products/' + id)
      .then( result => {
        console.log(result);
      })
      .then(
        window.location.reload()
      )
    },
  }
})