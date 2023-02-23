import axios from "axios"
import { error } from "@/utils/error";
const TOKEN_KEY = 'jwt-token'
const KEY = process.env.VUE_APP_FB_KEY;
export default {
    namespaced: true,
    state() {
        return {
            token: localStorage.getItem(TOKEN_KEY)
        }
    },
    mutations: {
      setToken(state, token){
          state.token = token;
          localStorage.setItem(TOKEN_KEY, token);
      },
      logout(state){
          state.token = null;
          localStorage.removeItem(TOKEN_KEY);
      }
    },
    actions: {
      async login({ commit, dispatch }, payload) {
          const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`;
          try{
             const { data } = await axios.post( url, {...payload, returnSecureToken: true});
              commit('setToken', data.idToken);
              commit('clearMessage', null, { root: true })
          }catch (e){
              console.error(error(e.response.data.error.message))
              dispatch('setMessage', {
                  value: error(e.response.data.error.message),
                  type: 'danger'
              }, { root: true })
              throw new Error(e)
          }

      }
    },
    getters: {
        token(state){
            return state.token;
        },
        isAuthenticated (state) {
            return !!state.token
        }
    }
}