import TopicList from '../components/TopicList';
import { useAppSelector } from '../redux/store';
import { selectUser, selectUserId } from '../redux/features/userSlice';
import UserRole from '../utils/types/UserRole';
import { Student } from '../utils/types/User';
import Tabs from '../components/Tabs';
import TabPane from '../components/TabPane';
import { BookmarkTopics } from '../utils/types/User';
import { selectUserBookmarkedTopics } from '../redux/features/userSlice';
import RegistrationPeriod from '../utils/types/RegistrationPeriod';
import Topic from '../utils/types/Topic';
import { useEffect, useState } from 'react';
import { selectPeriods } from '../redux/features/topicSlice';
import useCheckLogin from '../hooks/useCheckLogin';
import useCheckLoginRole from '../hooks/useCheckLoginRole';
import { TabsType } from '../utils/types/Tabs';
import NewTabs from '../components/NewTabs';

function BookmarkedTopics() {
  useCheckLoginRole(UserRole.STUDENT);
  const periods = useAppSelector(selectPeriods);
  const bookmarkedTopics = useAppSelector(selectUserBookmarkedTopics);
  console.log(bookmarkedTopics);
  const tabsData: TabsType[] = [];
  for (const [periodId, topics] of Object.entries(bookmarkedTopics)) {
    // get topic name
    const period = periods.find((period) => period.id === periodId);
    if (!period) continue;
    const topicList: Topic[] = [];
    for (const topicId of topics) {
      const topic = period.topics.find((topic) => topic.id === topicId);
      if (!topic) continue;
      topicList.push(topic);
    }

    if (topicList.length === 0) continue;

    const tabPane = <TopicList topics={topicList} period={periodId} />;
    tabsData.push({
      name: period.name,
      data: tabPane,
    });
  }

  return (
    <div>
      <NewTabs tabs={tabsData} />
    </div>
  );
}

export default BookmarkedTopics;
