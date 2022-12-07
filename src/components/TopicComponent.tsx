import Topic from '../utils/types/Topic';
import { openTopicDetail } from '../redux/features/topicDetailSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  selectUser,
  selectUserBookmarkedTopics,
  selectUserId,
} from '../redux/features/userSlice';
type TopicProps = {
  topic: Topic;
  period: string;
};
import { selectEducatorById } from '../redux/features/educatorSlice';

function TopicComponent({ topic, period }: TopicProps) {
  const user = useAppSelector(selectUser);
  const role = user?.role;
  const educator = useAppSelector((state) =>
    selectEducatorById(state, topic.educatorId)
  );

  const dispatch = useAppDispatch();
  const userBookmarkedTopics = useAppSelector(selectUserBookmarkedTopics);

  function openTopic() {
    dispatch(openTopicDetail(topic.id));
  }

  // const isEditable = checkIfPeriodActive();

  return (
    <div
      onClick={openTopic}
      className='group shadow-md rounded-xl cursor-pointer bg-white p-4 hover:bg-emerald-600 text-gray-600 hover:text-white transition-all'
    >
      <div className='flex justify-between'>
        <div className=''>
          <h2 className='font-semibold text-lg'>{topic.name}</h2>
          <p className='text-sm'>{topic.description}</p>
        </div>
      </div>
      <div className='flex flex-col gap-1 mt-1'>
        <p className='text-xs'>Chuyên ngành: {topic.specialization}</p>
        <p className='text-xs'>Giảng viên hướng dẫn: {educator?.name}</p>
        <div className='flex gap-2 flex-wrap'>
          {topic.outcomes.map((outcome, index) => (
            <p
              key={index}
              className='text-xs px-2 py-1 bg-gray-300 text-gray-700 rounded-md'
            >
              {outcome}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopicComponent;
