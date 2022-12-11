import CheckVisible from '../components/CheckVisible';
import EmptyTopicList from '../components/EmptyTopicList';
import TabPane from '../components/TabPane';
import Tabs from '../components/Tabs';
import TopicList from '../components/TopicList';
import { selectPeriods } from '../redux/features/topicSlice';
import {
  selectUserRole,
  selectUserSpecialization,
} from '../redux/features/userSlice';
import { useAppSelector } from '../redux/store';
import UserRole from '../utils/types/UserRole';

function SpecializationTopics() {
  const periods = useAppSelector(selectPeriods);
  const allPeriods = periods.map((period) => period.name);
  const userSpecialization = useAppSelector(selectUserSpecialization);

  const tabsPanel = periods.map((period) => {
    const filteredTopics = period.topics.filter(
      (topic) => topic.specialization === userSpecialization
    );

    if (filteredTopics.length === 0) return <EmptyTopicList />;

    return (
      <TabPane>
        <TopicList topics={filteredTopics} period={period.id} />
      </TabPane>
    );
  });

  return (
    <div className=''>
      <CheckVisible allowedRoles={[UserRole.HEAD_OF_DEPARTMENT]}>
        <Tabs tabs={allPeriods} data={tabsPanel} />
      </CheckVisible>
    </div>
  );
}

export default SpecializationTopics;
