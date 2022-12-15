import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import TopicDetail from "./components/TopicDetail";
import BookmarkedTopics from "./pages/BookmarkedTopics";
import CreatedTopics from "./pages/CreatedTopics";
import FindTopics from "./pages/FindTopics";

import { Unsubscribe } from "firebase/auth";
import { useEffect } from "react";
import CreatePeriod from "./components/CreatePeriod";
import Footer from "./components/Footer";
import { NotificationList } from "./components/NotificationList";
import Portal from "./components/Portal";
import { onAuthChangeState } from "./firebase/auth";
import {
  checkIfStudentJoinedAnyTopic,
  onPeriodsChange,
  onUserDataChange,
} from "./firebase/firestore";
import AccountManagement from "./pages/AccountManagement";
import NoAuthenticated from "./pages/NoAuthenticated";
import SpecializationTopics from "./pages/SpecializationTopics";
import { fetchEducators } from "./redux/features/educatorSlice";
import { selectOpenCreatePeriod } from "./redux/features/topicDetailSlice";
import { fetchRegistrationPeriods } from "./redux/features/topicSlice";
import {
  selectUserId,
  setJoinedTopic,
  setUser,
} from "./redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";

// educators.forEach((educator) => createUser(educator));
// students.forEach((student) => {
//   const { bookmarkedTopics, ...rest } = student;
//   createUser(rest);
// });
// createUser(admin);
// periods.forEach((period) => createPeriod(period));

function App() {
  const dispatch = useAppDispatch();
  const isCreatingTopic = useAppSelector(selectOpenCreatePeriod);
  const userId = useAppSelector(selectUserId);

  useEffect(() => {
    let unsubscribeUserDataChange: Unsubscribe;
    let unsubscribeJoinedTopicChange: Unsubscribe;

    if (userId) {
      unsubscribeUserDataChange = onUserDataChange(userId, (user) => {
        dispatch(setUser(user));
      });

      unsubscribeJoinedTopicChange = checkIfStudentJoinedAnyTopic(
        userId,
        (topicId) => {
          dispatch(setJoinedTopic(topicId));
        }
      );
    }

    return () => {
      unsubscribeUserDataChange?.();
    };
  }, [userId, dispatch]);

  useEffect(() => {
    const unsubscribePeriodChange = onPeriodsChange(() => {
      dispatch(fetchRegistrationPeriods());
    });

    const unsubscribeAuthChange = onAuthChangeState((user) => {
      dispatch(setUser(user));
    });

    dispatch(fetchEducators());

    return () => {
      unsubscribePeriodChange();
      unsubscribeAuthChange();
    };
  }, []);

  return (
    <div className="App bg-gray-200 min-h-screen">
      <Portal wrapperId="notification">
        <NotificationList />
      </Portal>
      <Navbar />
      <TopicDetail />
      <Footer />
      {isCreatingTopic && <CreatePeriod />}
      <div className="px-8">
        <Routes>
          <Route path="/" element={<FindTopics />} />
          <Route path="/bookmarks" element={<BookmarkedTopics />} />
          <Route path="/my-topics" element={<CreatedTopics />} />

          <Route
            path="/specialization-topics"
            element={<SpecializationTopics />}
          />

          <Route path="/account-management" element={<AccountManagement />} />
          <Route path="/not-authorised" element={<NoAuthenticated />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
