import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import RegistrationPeriod from '../../utils/types/RegistrationPeriod';
import { getEducators, getPeriods } from '../../firebase/firestore';
import { RootState } from '../store';
import { PayloadAction } from '@reduxjs/toolkit';
import Topic from '../../utils/types/Topic';
import { Educator } from '../../utils/types/User';

type EducatorState = {
  educators: Educator[];
  loading: boolean;
  error: string | null;
};

const initialState: EducatorState = {
  educators: [],
  loading: false,
  error: null,
};

const educatorSlice = createSlice({
  name: 'educators',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEducators.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEducators.fulfilled, (state, action) => {
      state.loading = false;
      state.educators = action.payload;
    });
    builder.addCase(fetchEducators.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

const fetchEducators = createAsyncThunk('topic/fetchEducators', async () => {
  const educators = await getEducators();
  return educators;
});

export default educatorSlice.reducer;
export { fetchEducators };
export const selectEducators = (state: RootState) => state.educator.educators;
export const selectEducatorById = createSelector(
  [selectEducators, (state: RootState, educatorId: string) => educatorId],
  (educators, id) => {
    const result = educators.find((educator) => educator.id === id);
    return result;
  }
);
