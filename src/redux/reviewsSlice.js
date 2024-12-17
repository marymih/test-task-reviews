import { createSlice } from '@reduxjs/toolkit';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchReviewsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReviewsSuccess: (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    fetchReviewsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchReviewsRequest, fetchReviewsSuccess, fetchReviewsFailure } =
  reviewsSlice.actions;

export default reviewsSlice.reducer;
