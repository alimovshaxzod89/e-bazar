import { createStore } from 'vuex'
import axios from 'axios'


export default createStore({
  state: {
    products: [],
  },
  getters: {},
  actions: {
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
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    REMOVE_ROW(state, id) {
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
