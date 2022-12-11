import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type TopicDetailState = {
  open: boolean;
  topicId: string;
  openCreatePeriod: boolean;
};

const initialState: TopicDetailState = {
  open: false,
  openCreatePeriod: false,
  topicId: '',
};

const topicDetailSlice = createSlice({
  name: 'topicDetail',
  initialState,
  reducers: {
    openTopicDetail(state, action) {
      state.open = true;
      state.topicId = action.payload;
    },
    closeTopicDetail(state) {
      state.open = false;
    },
    openCreatePeriod(state) {
      state.openCreatePeriod = true;
    },
    closeCreatePeriod(state) {
      state.openCreatePeriod = false;
    },
  },
});

export const {
  openTopicDetail,
  closeTopicDetail,
  openCreatePeriod,
  closeCreatePeriod,
} = topicDetailSlice.actions;
export default topicDetailSlice.reducer;
export const selectTopicOpen = (state: RootState) => state.topicDetail.open;
export const selectTopicId = (state: RootState) => state.topicDetail.topicId;
export const selectOpenCreatePeriod = (state: RootState) =>
  state.topicDetail.openCreatePeriod;
