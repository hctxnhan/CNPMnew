import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import topicDetailReducer from './features/topicDetailSlice'
import userReducer from './features/userSlice'
import topicReducer from './features/topicSlice'
import educatorSlice from './features/educatorSlice'

export const store = configureStore({
  reducer: {
    topicDetail: topicDetailReducer,
    user: userReducer,
    topic: topicReducer,
    educator: educatorSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
