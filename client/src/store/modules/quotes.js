import axios from 'axios'
import auth from './auth'


export default {


    namespaced:true,

    state:{
        publicQuotes: null,
        isUpdate:false,
        editQuote:{
            statu:'public'
        },
        userQuotes: null
    },

    mutations:{
        publicQuotes(state, quotes){
            state.publicQuotes = quotes
          },
        updateUserQuote(state, quotes){
            state.userQuotes.unshift(quotes)
          },
        setuserQuotes(state, uQuotes){
            state.userQuotes = uQuotes
        },
        clearIsUpdate(state){
            state.isUpdate = false
        },
        updateAfterdelet(state, id){
            state.userQuotes = state.userQuotes.filter(el => el._id !== id)
        }

          
    },

    actions:{

        fetchPublicQuotes({commit}){
            axios
            .get("/api/pbquotes")
            .then(res => {
                console.log(res.data)
                commit('publicQuotes', res.data)
            })
            .catch(err => console.log(err));
             },

        createQuote({commit}, quote){
            if(!auth.state.token) return
            const config = {
                headers:{
                    'x-auth-token': auth.state.token
                },
                useCredentails: true
              };
            axios
            .post('/api/quotes',quote, config)
            .then(res => {
                commit('updateUserQuote', res.data)})
            .catch(err => console.error(err.message))
        },

        fetchUserQuotes({commit}) {
            if(!auth.state.token) return
            const config = {
                headers:{
                    'x-auth-token': auth.state.token
                },
                useCredentails: true
              };
            axios
            .get('/api/quotes', config)
            .then(res => {
               commit('setuserQuotes', res.data)})
            .catch(err => console.error(err.message))
        },
        
        cancelUpdate({commit}) {
            commit('clearIsUpdate')
        },

        editeQuote(){

        },

        deleteQuote({commit}, id){
            if(!auth.state.token) return
            const config = {
                headers:{
                    'x-auth-token': auth.state.token
                },
                useCredentails: true
              };
            axios.delete(`/api/quotes/${id}`,config)
            .then(() => commit('updateAfterdelet', id))
            .catch(err => console.error(err.message))
        }

        



        },

    getters:{
        getQuotes(state){
            return state.publicQuotes
        },
        getIsUpdate(state){
            return state.isUpdate
        },
        getEditQuote(state) {
            return state.editQuote
        },
        getUserQuotes(state){
            return state.userQuotes
        },
        

        

    }




    
}