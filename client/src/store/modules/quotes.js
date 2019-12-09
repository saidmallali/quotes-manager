import axios from 'axios'


export default {


    namespaced:true,

    state:{
        publicQuotes: null,
        
    },

    mutations:{
        publicQuotes(state, quotes){
            state.publicQuotes = quotes
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


        



        },

    getters:{
        getQuotes(state){
            return state.publicQuotes
        },

        

    }




    
}