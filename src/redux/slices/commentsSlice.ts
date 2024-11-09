// src/slices/commentsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Comment {
  id: string;
  author: string;
  content: string;
  rating: number;
}

interface CommentsState {
  comments: Comment[];
}

const initialState: CommentsState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(comment => comment.id !== action.payload);
    },
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;

export default commentsSlice.reducer;
