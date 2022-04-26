import { createStore } from 'redux';



/* const reducer = (state = {
    counter:0,

}, action)=>{
    if(action.type === 'increment'){
        return {
            counter: state.counter +1,
        }
    }
    if(action.type === 'decrement'){
        return {
            counter: state.counter -1,
        }
    }

    return state;
}
 */


const reducer = (state = {
    data: "",

}, action)=>{
    switch (action.type) {
        case "FETCH_DATA":
          return {
            ...state,
            data: action.data
          };
        default:
          return state;
      }

}


const store = createStore(reducer);
export default store;

