import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token) {
      state.status = 'success'
      state.token = token
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  },
  actions: {
    login({commit, dispatch}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: '/auth/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            localStorage.setItem('token', `Bearer ${token}`)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit('auth_success', token)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: '/auth/register', data: user, method: 'POST' })
          .then(resp => {
            console.log(resp)
            const token = resp.data.token
            localStorage.setItem('token', `Bearer ${token}`)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit('auth_success', token)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({commit, dispatch}) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
});
