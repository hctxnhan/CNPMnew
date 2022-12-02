import React from 'react'
import TabPane from '../components/TabPane'
import Tabs from '../components/Tabs'
import TopicList from '../components/TopicList'
import { selectUser, selectUserId } from '../redux/features/userSlice'
import { useAppSelector } from '../redux/store'
import UserRole from '../utils/types/UserRole'
import { BsPlusSquareDotted } from 'react-icons/bs'
import CreateTopic from '../components/CreateTopic'
import RegistrationPeriod from '../utils/types/RegistrationPeriod'
import { selectTopicsByEducatorId } from '../redux/features/topicSlice'
import useCheckLoginRole from '../hooks/useCheckLoginRole'
import WithOverlay from '../components/WithOverlay'

function CreatedTopics() {
  useCheckLoginRole(UserRole.EDUCATOR);
  const [openCreateTopic, setOpenCreateTopic] = React.useState(false);
  const userId = useAppSelector(selectUserId);
  const ownTopics = useAppSelector((state) => {
    if (userId) {
      return selectTopicsByEducatorId(state, userId);
    }
    return [];
  });
  const tabsPanel = ownTopics.map((period) => {
    // if (!(user.role === UserRole.EDUCATOR)) return <TabPane></TabPane>
    return (
      <TabPane>
        <TopicList topics={period.topics} period={period.id} />
      </TabPane>
    );
  });
  * Day 7 Loc
  return (
    <div>
      {openCreateTopic && (
        <WithOverlay>
          <CreateTopic
            onClose={() => {
              setOpenCreateTopic(false);
            }}
          />
        </WithOverlay>
      )}
      {!openCreateTopic && (
        <button
          onClick={() => {
            setOpenCreateTopic(true);
          }}
          className='fixed bottom-4 right-4 bg-white p-2 rounded-lg hover:bg-emerald-500 cursor-pointer hover:text-white transition-all'
        >
          <BsPlusSquareDotted size={25} />
        </button>
      )}
      <Tabs tabs={ownTopics.map((period) => period.name)} data={tabsPanel} />
    </div>
  );
}

export default CreatedTopics
