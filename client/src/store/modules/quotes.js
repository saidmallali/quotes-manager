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
            console.log('create quote')
            if(!auth.state.token) return
            const config = {
                headers:{
                    'x-auth-token': auth.state.token
                },
                useCredentails: true
              };
            axios.post('/api/quotes',quote, config)
            .then(res => {
                console.log(res.data)
                commit('updateUserQuote', res.data)
                commit('clearIsUpdate')})
            .catch(err => console.error(err))
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
            console.log(quote)
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