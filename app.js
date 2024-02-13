// import package 
const {createAction, createReducer, configureStore, nanoid} = require("@reduxjs/toolkit");

// InitialState 
const initialState = {
    counter: 0,
}
// Action Creator - Action 
const increment = createAction("INCREMENT");
const decrement = createAction("DECREMENT");
const resetCounter = createAction("RESET");

// create custom createAction
const incrementBy = createAction("INCEREMENT_BY", (amount)=>{
    return {
        payload:{
            amount,
        }
    }
});


// ** Create Reducer **
// - Builder callback notation
// - map object notation

// builder callback notation
const counterSlice = createReducer(initialState, (builder)=>{
    // increment
    builder.addCase(increment, (state)=>{
        state.counter += 1;
    });

    // decrement
    builder.addCase(decrement, (state)=>{
        state.counter -= 1;
    })

    // reset 
    builder.addCase(resetCounter, (state)=>{
        state.counter = 0;
    })

    // increment by
    builder.addCase(incrementBy, (state, action)=>{
        state.counter += action.payload.amount;
    })
});

// map object notation
const counterSlice2 = createAction(initialState, {
[increment]: (state) =>{
    state.counter += 1;
},
[decrement] : (state)=>{
    state.counter -= 1;
},
[resetCounter]: (state)=>{
    state.counter = 0;
}, 
[incrementBy]: (state, action)=>{
    state.counter += action.payload.amount;
},
});

// Store
const store = configureStore({
    reducer: counterSlice,
});

//dispatch action
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());

store.dispatch(decrement());

store.dispatch(incrementBy(100));

console.log(store.getState());
