import { Educator } from '../utils/types/User';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';
import Button from './Button';
import CheckVisible from './CheckVisible';
import UserRole from '../utils/types/UserRole';

type TeacherEvaluationItemProps = {
  teacher: Educator;
  onRemove?: (teacher: Educator) => void;
  onAdd?: (teacher: Educator) => void;
};

function TeacherEvaluationItem({
  teacher,
  onAdd,
  onRemove,
}: TeacherEvaluationItemProps) {
  const teacherItem = (
    <div className='bg-gray-100 py-2 px-3 rounded-lg hover:bg-gray-200 flex justify-between items-center'>
      <div>
        <p className='text-gray-800 text-sm'>{teacher.name}</p>
        <p className='text-gray-400 text-xs'>{teacher.specialization}</p>
      </div>
      <CheckVisible
        allowedRoles={[UserRole.HEAD_OF_DEPARTMENT]}
        rules={onAdd !== undefined}
      >
        <Button onClick={() => onAdd?.(teacher)}>
          <AiOutlineUserAdd className='text-white' size={20} />
        </Button>
      </CheckVisible>
      <CheckVisible
        allowedRoles={[UserRole.HEAD_OF_DEPARTMENT]}
        rules={onRemove !== undefined}
      >
        <Button buttonType='danger' onClick={() => onRemove?.(teacher)}>
          <AiOutlineUserDelete className='text-white' size={20} />
        </Button>
      </CheckVisible>
    </div>
  );

  return <div>{teacher && teacherItem}</div>;
}

export default TeacherEvaluationItem;
