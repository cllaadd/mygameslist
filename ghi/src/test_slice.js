import { createSlice } from '@reduxjs/toolkit'

// Define what the initial data should look like
// This is what was in the constructor of the stateful
// component above.
const initialState = {
  articles: [
    { title: "Writing stateful components", id: 1 },
    { title: "Using Redux", id: 2 }
  ],
};

// Create the "slice of data that is the articles data"
export const articleSlice = createSlice({
  name: 'counter',
  initialState, // Set the initial state
  reducers: {
    // Define the logic about how to add a new article
    // to the list of articles in the state
    addArticle: (state, action) => {
      // The action's payload has the data that we want
      // to add
      const newArticle = action.payload;

      // We use the push method to add the new article
      // to the existing list of articles in the state
      state.articles.push(newArticle);
    },
  },
});

// Export our actions for use in our components
export const { addArticle } = articleSlice.actions

// Export the reducer to use in the declaration of our
// store in store.js
export default articleSlice.reducer

const state = createSlice({
    name: "games",
    initialState,
    reducers: {
        addGame: (state, action) => {
            state.games.push(action.payload);
        }
    })
