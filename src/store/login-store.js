import Vue from 'vue'
import qs from 'qs'
import Cookies from "js-cookie";

export default {
  state: {
    isLogin: false,
    user: {
    }
  },
  mutations: {
    login(state, payload) {
      state.isLogin = true
      state.user = payload
    },
    logout(state){
      state.user=""
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post('/api/login', qs.stringify(payload))
         .then(function (response) {
           var result = response.data;
           if (result.code == 200) {
             console.log(result.data)
             Cookies.set("name", result.data.account, { expires: 7 });
             Cookies.set("id", result.data.id, { expires: 7 });
             resolve(response)
             context.commit('login', result.data)
           } else {
             reject(response)
           }
         })
         .catch(function (error) {
           var errorData = {
             message: '系统出错'
           }
           error.data = errorData
           reject(error)
         });

      })

    },
    outUser(context,state){
      context.commit('logout')
    }
  },
  getters: {
    getUser(state) {
      return state.user
    },
    // outUser(state){
    //   state.user=''
    //   return state.user
    // }
  }
}
