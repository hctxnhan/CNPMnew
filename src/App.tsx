import Navbar from './components/Navbar'
import FindTopics from './pages/FindTopics'
import { Routes, Route } from 'react-router-dom'
import BookmarkedTopics from './pages/BookmarkedTopics'
import TopicDetail from './components/TopicDetail'
import CreatedTopics from './pages/CreatedTopics'

import { educators, students, admin } from './firebase/userMock'

import { useEffect } from 'react'
import {
  checkIfStudentJoinedAnyTopic,
  onPeriodsChange,
  onUserDataChange,
} from './firebase/firestore'
import { fetchRegistrationPeriods } from './redux/features/topicSlice'
import { useAppDispatch, useAppSelector } from './redux/store'
import { fetchEducators } from './redux/features/educatorSlice'
import { onAuthChangeState } from './firebase/auth'
import {
  selectUserId,
  setJoinedTopic,
  setUser,
} from './redux/features/userSlice'
import NoAuthenticated from './pages/NoAuthenticated'
import Portal from './components/Portal'
import CreateTopic from './components/CreateTopic'
import CreatePeriod from './components/CreatePeriod'
import { selectOpenCreatePeriod } from './redux/features/topicDetailSlice'
import User from './utils/types/User'
import { Unsubscribe } from 'firebase/auth'

function App() {
  const dispatch = useAppDispatch()
  const isCreatingTopic = useAppSelector(selectOpenCreatePeriod)
  const userId = useAppSelector(selectUserId)

  useEffect(() => {
    let unsubscribeUserDataChange: Unsubscribe
    let unsubscribeJoinedTopicChange: Unsubscribe

    if (userId) {
      unsubscribeUserDataChange = onUserDataChange(userId, (user) => {
        dispatch(setUser(user))
      })

      unsubscribeJoinedTopicChange = checkIfStudentJoinedAnyTopic(
        userId,
        (topicId) => {
          dispatch(setJoinedTopic(topicId))
        }
      )
    }

    return () => {
      unsubscribeUserDataChange?.()
    }
  }, [userId, dispatch])

  useEffect(() => {
    const unsubscribePeriodChange = onPeriodsChange(() => {
      dispatch(fetchRegistrationPeriods())
    })

    const unsubscribeAuthChange = onAuthChangeState((user) => {
      dispatch(setUser(user))
    })

    dispatch(fetchEducators())

    return () => {
      unsubscribePeriodChange()
      unsubscribeAuthChange()
    }
  }, [])

  return (
    <div className='App bg-gray-200 min-h-screen'>
      <Navbar />
      <TopicDetail />
      {isCreatingTopic && <CreatePeriod />}
      <div className='px-8'>
        <Routes>
          <Route path='/' element={<FindTopics />} />
          <Route path='/my-topics' element={<CreatedTopics />} />
          <Route path='/not-authorised' element={<NoAuthenticated />} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
