import axios from "../../axios/request"
import store from '../index'
export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    mutations:{
        setRequest(state, requests){
            state.requests = requests;
        },
        addRequest(state, request) {
            state.requests.push(request)
        }
    },
    actions:{
        async create({ commit, dispatch }, payload){
            try {
                const token = store.getters["auth/token"];
                const { data } = await axios.post(`/request.json?auth=${token}`, payload);
                commit('addRequest', {...payload, id: data.name})
                dispatch('setMessage', {
                    value: 'Заявка успешно пройдена',
                    type: 'primary'
                }, { root: true })
            }catch (e){
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, { root: true })
            }
        },
        async load({ commit, dispatch }){
            try {
                const token = store.getters["auth/token"];
                const { data } = await axios.get(`/request.json?auth=${token}`);
                const items = Object.keys(data).map( id => ({id, ...data[id]}));
                commit('setRequest', items);
            }catch (e){
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, { root: true })
            }
        },
    },
    getters: {
        requests(state){
            return state.requests
        }
    },
}