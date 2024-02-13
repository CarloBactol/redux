const {createAsyncThunk, createSlice, configureStore} = require("@reduxjs/toolkit");
const axios = require("axios");

const API = "https://jsonplaceholder.typicode.com/posts";


// InitialState
const initialState = {
    posts: [],
    loading: false,
    error: null,
}

// create Async Thunk
const fetchPosts = createAsyncThunk("posts/fetchPosts", async ()=>{
    const res = await axios.get(API);
    return res.data; // accept data only
});

//slice
const postSlice = createSlice({
    name: "posts",
    initialState,
    extraReducers: (builder)=>{

        // pending
        builder.addCase(fetchPosts.pending, (state)=>{
            state.loading = true;
        });

        // fulfilled 
        builder.addCase(fetchPosts.fulfilled, (state, action)=>{
            state.posts = action.payload;
            state.loading = false;
        });

        // rejected 
        builder.addCase(fetchPosts.rejected, (state, action)=>{
            state.posts = [];
            state.loading = false;
            state.error = action.payload;
        });

    }
})

// Generate Reducer
const postReducer = postSlice.reducer

// Store
const store = configureStore({
    reducer: postReducer,
});

// dispatch
store.subscribe(()=>{
    console.log(store.getState());
});
store.dispatch(fetchPosts());
