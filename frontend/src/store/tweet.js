import { createAsyncThunk } from '@reduxjs/toolkit';
import produce from 'immer';
// constant to avoid debugging typos
const GET_ALL_TWEETS = 'tweet/getAllTweets';
const ADD_TWEET = 'tweets/ADD_TWEET';
//regular action creators
const loadTweets = (tweets) => {
  return {
    type: GET_ALL_TWEETS,
    tweets
  };
};
export const addTweetAction = (tweet) => ({type: ADD_TWEET, payload: tweet, });

// thunk action creator
export const getAllTweets = () => async (dispatch) => {
  const response = await fetch('/api/tweets');

  if (response.ok) {
    const data = await response.json();
    dispatch(loadTweets(data));
    return data;
  }
};
export const addTweet = createAsyncThunk(
  ADD_TWEET,
  async (tweetContent, { dispatch, rejectWithValue}) => {
    const response = await fetch ('.api/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({content: tweetContent}),
    });
    if (!response.ok){
      return rejectWithValue('Network response was not ok');
    }
    const newTweet = await response.json();
    dispatch(addTweetAction(newTweet));
    return newTweet;
  }
);

// state object
const initialState = { 
  byId: {},
  allIds: [],
  };
// reducer
const tweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TWEETS: {
      const newState = {};
      action.tweets.forEach((tweet) => (newState[tweet.id] = tweet));
      return newState;
    }
    case ADD_TWEET: {
       const { id, content } = action.payload;
        return produce(state, (draft) => {
        draft.byId[id] = { id, content }; draft.allIds.push(id);
       });
      }
    default:
      return state;
  }
};

export default tweetsReducer;
