const {createSlice, configureStore} = require("@reduxjs/toolkit");
const logger = require("redux-logger").createLogger();



// InitializeState
const initialState = {
    counter: 0,
}

// createSlice
const counterSlice = createSlice({
name: "counterMe",
initialState,
reducers: {
    increment: (state, action)=>{
        state.counter += 1;
    },
    decrement: (state, action)=>{
        state.counter -= 1;
    },
    resetCounter: (state, action)=>{
        state.counter = 0;
    },
    incrementBy: (state, action)=>{
        state.counter += action.payload
    },
}
});

// Generate Action
const {increment, decrement, resetCounter, incrementBy} = counterSlice.actions

// Generate Reducer
const counterReducer = counterSlice.reducer

// Store
const store = configureStore({
    reducer: counterReducer,
    middleware: (getDefaultMidlleware)=> getDefaultMidlleware().concat(logger),
});

// dispatch
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(incrementBy(100));

console.log(store.getState());

