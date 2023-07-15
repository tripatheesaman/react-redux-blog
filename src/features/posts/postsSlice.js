import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
  reactions: {
    thumbsUp: 0,
    wow: 0,
    heart: 0,
  },
};
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPosts = createAsyncThunk(
  "posts/addNewPosts",
  async (newPost) => {
    const response = await axios.post(POSTS_URL, newPost);
    return response.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    increaseReaction: (state, action) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        // ADD DATE AND REACTIONS TO EACH POSTS
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
          };
          return post;
        });
        state.posts = state.posts.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPosts.fulfilled, (state, action) => {
        const sortedPosts = state.posts.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });
        action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
        };
        state.posts.push(action.payload);
      });
  },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;
export const { increaseReaction } = postsSlice.actions;

export default postsSlice.reducer;
