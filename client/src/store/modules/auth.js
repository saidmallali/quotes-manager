import axios from 'axios'

export default {
    namespaced:true,

    state: {
        token:null,
        user:null
      },

      mutations: {

        autUser(state, authData){
          state.token = authData.token
        },
        user(state, infoUser){
            state.user = infoUser
        },
        clearToken(state){
            state.token = null,
            state.user = null
        }
    
      },

      actions: {

        register({commit, dispatch}, authData){
          const config = {
            useCredentails: true
          };
          axios.post("/api/users", authData, config).then(res => {
            console.log(res.data);
            commit('autUser', res.data)
            const now = new Date();
            const expirationDate = new Date(now.getTime() + res.data.expiresTime)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('expiresDate', expirationDate)
            dispatch('setLogoutTimer', res.data.expiresTime)
          });
        },
    
        login({commit, dispatch}, authData){
          const config = {
            useCredentails: true
          };
    
          axios.post("/api/auth", authData, config).then(res => {
            commit('autUser', res.data)
            console.log(res.data);
            const now = new Date();
            const expirationDate = new Date(now.getTime() + res.data.expiresTime)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('expiresDate', expirationDate)
            dispatch('setLogoutTimer', res.data.expiresTime)
          });
        },

        autoLogin({commit}){
            const token = localStorage.getItem('token');
            if(!token) return
            const expiresDate = localStorage.getItem('expiresDate')
            const now = new Date()
            if( now >= expiresDate) return
            commit('autUser', {token})
        },

        fetchUser({commit, state}){
            console.log(state)
            if(!state.token) return
            const config = {
                headers:{
                    'x-auth-token': state.token
                },
                useCredentails: true
              };
              axios.get("/api/auth", config).then(res => {
                console.log(res.data);
                commit('user', res.data)
              });
        },
        
        logout({commit}) {
          localStorage.removeItem('token')
          localStorage.removeItem('expiresDate')
          commit('clearToken')
          },

        setLogoutTimer ({commit}, expirationTime){
            setTimeout(() => {
              localStorage.removeItem('token')
              localStorage.removeItem('expiresDate')
                commit('clearToken')
            }, expirationTime * 1000);
        }
    
        
      },

      getters: {
        getUser(state){
            return state.user
        },

        isAuthenticated (state) {
            return state.token !== null
        }
      }


}