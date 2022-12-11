import EmptyTopicList from '../components/EmptyTopicList';
import Search from '../components/Search';
import TabPane from '../components/TabPane';
import Tabs from '../components/Tabs';
import TopicList from '../components/TopicList';
import { selectPeriods } from '../redux/features/topicSlice';
import { useAppSelector } from '../redux/store';

function FindTopics() {
  const periods = useAppSelector(selectPeriods);
  const allPeriods = periods.map((period) => period.name);

  const tabsPanel = periods.map((period) => {
    if (period.topics.length === 0) return <EmptyTopicList />;
    return (
      <TabPane>
        <TopicList topics={period.topics} period={period.id} />
      </TabPane>
    );
  });

  return <Tabs tabs={allPeriods} data={tabsPanel} />;
  // database local
}

export default FindTopics;
