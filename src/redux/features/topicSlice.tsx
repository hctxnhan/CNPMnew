// * Loc day 6

import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import RegistrationPeriod from '../../utils/types/RegistrationPeriod';
import { getPeriods } from '../../firebase/firestore';
import { RootState } from '../store';
import { PayloadAction } from '@reduxjs/toolkit';
import Topic from '../../utils/types/Topic';
import checkIfPeriodActive from '../../utils/functions/CheckIfPeriodACtive';

type TopicState = {
  periods: RegistrationPeriod[];
  loading: boolean;
  error: string | null;
};

const initialState: TopicState = {
  periods: [],
  loading: false,
  error: null,
};

const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegistrationPeriods.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRegistrationPeriods.fulfilled, (state, action) => {
      state.loading = false;
      state.periods = action.payload;
    });
    builder.addCase(fetchRegistrationPeriods.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

const fetchRegistrationPeriods = createAsyncThunk(
  'topic/fetchRegistrationPeriods',
  async () => {
    const periods = await getPeriods();
    return periods;
  }
);

export default topicSlice.reducer;
export { fetchRegistrationPeriods };
export const selectPeriods = (state: RootState) => state.topic.periods;
export const selectTopicsByEducatorId = createSelector(
  [selectPeriods, (state: RootState, educatorId: string) => educatorId],
  (periods, id) => {
    const ownTopics: RegistrationPeriod[] = [];
    //filter periods array to get only the periods that have topics created by the educator
    periods.forEach((period) => {
      const topics = period.topics.filter((topic) => topic.educatorId === id);
      if (topics.length > 0) {
        ownTopics.push({
          ...period,
          topics,
        });
      }
    });
    return ownTopics;
  }
);
export const selectTopicById = createSelector(
  [selectPeriods, (state: RootState, topicId: string) => topicId],
  (periods, id) => {
    const result = periods
      .flatMap((period) => period.topics)
      .filter((topic) => topic.id === id);

    if (result.length > 0) {
      return result[0];
    }

    return null;
  }
);

export const selectActivePeriod = createSelector([selectPeriods], (periods) => {
  // find period that contains the current date
  const result = periods.filter((period) => {
    return checkIfPeriodActive(period);
  });
  console.log('result', result);
  return result;
});

export const selectTopicPeriodId = createSelector(
  [selectPeriods, (state: RootState, topicId: string) => topicId],
  (periods, id) => {
    let periodId = '';
    periods.forEach((period) => {
      const topics = period.topics.filter((topic) => topic.id === id);
      if (topics.length > 0) {
        periodId = period.id;
      }
    });
    return periodId;
  }
);

export const selectPeriodById = createSelector(
  [selectPeriods, (state: RootState, periodId: string) => periodId],
  (periods, id) => {
    const result = periods.filter((period) => period.id === id);
    if (result.length > 0) {
      return result[0];
    }

    return null;
  }
);
