// import axios from 'axios';
// import auth from './auth'

export default {
    namespaced:true,

    state:{
        // userQuotes: null
    },

    mutations:{
        // setuserQuotes(state, uQuotes){
        //     state.userQuotes = uQuotes
        // }
    },

    actions:{

        

        // fetchUserQuotes({commit}) {
        //     console.log('fetchUserQuotes')
        //     if(!auth.state.token) return
        //     const config = {
        //         headers:{
        //             'x-auth-token': auth.state.token
        //         },
        //         useCredentails: true
        //       };
        //     axios
        //     .get('/api/quotes', config)
        //     .then(res => {
        //         console.log('response of userQuotes',res.data)
        //         commit('setuserQuotes', res.data)})
        //     .catch(err => console.error('response of userQuotes',err.message))
        // },
        
        



    },

    getters: {
        // getUserQuotes(state){
        //     console.log('userQuotes',state.userQuotes)
        //     return state.userQuotes
        // }
    }
}