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
        userQuotes: null,
        countPublicQuotes:null,
        contUserQuotes:null
    },

    mutations:{
        publicQuotes(state, quotes){
            state.publicQuotes = quotes.quotes
            state.countPublicQuotes = quotes.countQuotes
          },
        updateUserQuote(state, quotes){
            state.userQuotes.unshift(quotes)
          },
        setuserQuotes(state, uQuotes){
            state.userQuotes = uQuotes.quotes
            state.contUserQuotes = uQuotes.countQuotes
        },
        clearIsUpdate(state){
            state.isUpdate = false;
            state.editQuote = {
                statu:'public'
            }
        },
        updateAfterdelet(state, id){
            state.userQuotes = state.userQuotes.filter(qt => qt._id !== id)
        },
        updateEditeQuote(state, id){
            state.editQuote = state.userQuotes.find(qt => qt._id === id );
            state.isUpdate = true;
        },
        setEditeQuote(state, value){
            state.editQuote.quote = value
        },
        setEditeQuoteStatu(state, value){
            state.editQuote.statu = value
        },
        updateUserQuotesAfterUpdate(state, quote){
            state.userQuotes = state.userQuotes.map(qt =>  qt._id === quote._id ? quote : qt);
            state.isUpdate = false;
            state.editQuote = {
                statu:'public'
            }
        }

          
    },

    actions:{

        fetchPublicQuotes({commit}, {page, limit}){
            axios
            .get(`/api/pbquotes?page=${page}&limit=${limit}`)
            .then(res => {
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
            axios.post('/api/quotes',quote, config)
            .then(res => {
                commit('updateUserQuote', res.data)
                commit('clearIsUpdate')})
            .catch(err => console.error(err))
        },

        fetchUserQuotes({commit}, {page, limit}) {
            if(!auth.state.token) return
            const config = {
                headers:{
                    'x-auth-token': auth.state.token
                },
                useCredentails: true
              };
            axios
            .get(`/api/quotes?page=${page}&limit=${limit}`, config)
            .then(res => {
               commit('setuserQuotes', res.data)})
            .catch(err => console.error(err.message))
        },
        
        cancelUpdate({commit}) {
            commit('clearIsUpdate')
        },

        editeQuote({commit},id){
            commit('updateEditeQuote', id)
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
        },

        setEditeQuote({commit}, value){
            commit('setEditeQuote', value)
        },
        setEditeQuoteStatu({commit}, value) {
            commit('setEditeQuoteStatu', value)
        },

        updateQuote({commit}, quote){
            if(!auth.state.token) return
            const config = {
                headers:{
                    'x-auth-token': auth.state.token
                },
                useCredentails: true
              };
            axios.put(`/api/quotes/${quote._id}`,quote,config)
            .then(res => commit('updateUserQuotesAfterUpdate', {quote:res.data}))
            .catch(err => console.error(err.message))
        },

        searchQuote({commit},quote){
            axios
            .get(`/api/pbquotes?search=${quote}`)
            .then(res => {
                commit('publicQuotes', res.data)
            })
            .catch(err => console.log(err));
        },

        searchQuoteUser({commit},quote){
            if(!auth.state.token) return
            const config = {
                headers:{
                    'x-auth-token': auth.state.token
                },
                useCredentails: true
              };
            axios
            .get(`/api/quotes?search=${quote}`, config)
            .then(res => {
               commit('setuserQuotes', res.data)})
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
        getcountPublicQuotes(state){
            return state.countPublicQuotes
        },
        getcountUserQuotes(state){
            return state.contUserQuotes
        }
        

        

    }




    
}