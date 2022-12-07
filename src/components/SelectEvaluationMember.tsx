import { Educator } from '../utils/types/User';

import { useEffect, useState } from 'react';
import TeacherList from './TeacherList';
import { useAppSelector } from '../redux/store';
import { selectEducators } from '../redux/features/educatorSlice';
import CheckVisible from './CheckVisible';
import UserRole from '../utils/types/UserRole';
import Button from './Button';
import { setEvaluationMembers } from '../firebase/firestore';
import { selectTopicById } from '../redux/features/topicSlice';

type SelectEvaluationMemberProps = {
  numberOfMembers?: number;
  topicId: string;
  periodId: string;
};

function SelectEvaluationMember({
  numberOfMembers = 5,
  topicId,
  periodId,
}: SelectEvaluationMemberProps) {
  const [member, setMember] = useState<Educator[]>([]);

  const allTeachers = useAppSelector(selectEducators);

  const currentTopic = useAppSelector((state) =>
    selectTopicById(state, topicId)
  );

  const notSelectedTeachers = allTeachers.filter(
    (teacher) => !member.includes(teacher)
  );

  useEffect(() => {
    if (currentTopic?.evaluationMembers) {
      const teachers = allTeachers.filter((teacher) =>
        currentTopic.evaluationMembers.includes(teacher.id)
      );
      setMember(teachers);
    }
  }, [topicId, periodId, currentTopic]);

  function addMember(teacher: Educator) {
    // check if teacher is already selected
    if (member.includes(teacher)) {
      return;
    }

    // check if number of members is already reached
    if (member.length < numberOfMembers) {
      setMember((prev) => [...prev, teacher]);
    }
  }

  function removeMember(teacher: Educator) {
    setMember((prev) => prev.filter((t) => t.id !== teacher.id));
  }

  function handleSave() {
    const members = member.map((m) => m.id);

    setEvaluationMembers(periodId, topicId, members);
  }

  const emptyEvaluationMember = (
    <div className='text-center'>
      <div className='text-gray-500 text-xl'>Chưa có giáo viên nào!</div>
    </div>
  );

  return (
    <div>
      <div className='grid grid-cols-2 gap-2 relative'>
        <div>
          <h1 className='text-center uppercase text-gray-500 text-xs font-semibold tracking-tight mb-2'>
            Hội đồng (tối đa {numberOfMembers} người)
          </h1>
          <CheckVisible
            allowedRoles={[UserRole.HEAD_OF_DEPARTMENT]}
            rules={member.length === 0}
          >
            {emptyEvaluationMember}
          </CheckVisible>

          <CheckVisible
            allowedRoles={[UserRole.HEAD_OF_DEPARTMENT]}
            rules={member.length > 0}
          >
            <div className='max-h-[400px] overflow-y-scroll pr-1'>
              <TeacherList teachers={member} onRemove={removeMember} />
            </div>
          </CheckVisible>
        </div>
        <div>
          <p className='text-center uppercase text-gray-500 text-xs font-semibold tracking-tight mb-2'>
            Danh sách giáo viên
          </p>

          <div className='max-h-[400px] overflow-y-scroll pr-1'>
            <TeacherList
              teachers={[...notSelectedTeachers]}
              setSelectedTeachers={addMember}
            />
          </div>
        </div>
      </div>
      <div className='text-right mt-3 flex justify-end'>
        <Button onClick={handleSave}>Phân công</Button>
      </div>
    </div>
  );
}

export default SelectEvaluationMember;
