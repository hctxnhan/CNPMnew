import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import User, { Educator, Student } from '../../utils/types/User';
import UserRole from '../../utils/types/UserRole';
import Specialization from '../../utils/types/Specialization';
import Topic from '../../utils/types/Topic';
import { PayloadAction } from '@reduxjs/toolkit';

interface LoggedInUser extends User {}

type UserState = {
  user: LoggedInUser | null;
  // loading: boolean;
  // error: string | null;
  // myTopics: Topic[] | null;
  joinedTopic: string | null;
};

// const educator: Educator = {
//   id: 'fAExn5jnFmaux7INZroagmesNoxO',
//   name: 'Nguyễn Thị B',
//   email: '',
//   role: UserRole.EDUCATOR,
//   specialization: Specialization.COMPUTER_NETWORKING,
// };

// const student: Student = {
//   id: 'JkO3Xo6Sq8l8J3A94LhySjPjzKRP',
//   name: 'Hoàng Văn A',
//   email: '',
//   role: UserRole.STUDENT,
//   specialization: Specialization.COMPUTER_NETWORKING,
//   bookmarkedTopics: {},
// };

const initialState: UserState = {
  user: null,
  joinedTopic: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setJoinedTopic(state, action: PayloadAction<string | null>) {
      state.joinedTopic = action.payload;
    },
  },
});

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserBookmarkedTopics = (state: RootState) => {
  if (state.user.user) {
    if (state.user.user.role === UserRole.STUDENT) {
      const student = state.user.user as Student;
      return student.bookmarkedTopics;
    }
  }
  return {};
};

export const selectUserId = createSelector(selectUser, (user) => user?.id);
export const selectUserSpecialization = createSelector(
  selectUser,
  (user) => user?.specialization
);
export const selectUserJoinedTopic = (state: RootState) =>
  state.user.joinedTopic;
export const selectUserRole = createSelector(selectUser, (user) => user?.role);

export const selectUserAppliedTopics = createSelector(
  selectUser,
  (user): string[] => {
    if (user) {
      if (user.role === UserRole.STUDENT) {
        const student = user as Student;
        return student.appliedTopics;
      }
    }
    return [];
  }
);

export const { setUser, setJoinedTopic } = userSlice.actions;
