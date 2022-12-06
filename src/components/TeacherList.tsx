import { Educator } from '../utils/types/User';
import UserRole from '../utils/types/UserRole';
import CheckVisible from './CheckVisible';
import TeacherEvaluationItem from './TeacherEvaluationItem';

type TeacherListProps = {
  teachers: Educator[];
  selectedTeachers?: string[];
  setSelectedTeachers?: (teacher: Educator) => void;
  onRemove?: (teacher: Educator) => void;
};

function TeacherList({
  teachers,
  selectedTeachers,
  setSelectedTeachers,
  onRemove,
}: TeacherListProps) {
  return (
    <div className='flex flex-col gap-2'>
      {teachers.map((teacher) => (
        <TeacherEvaluationItem
          onAdd={setSelectedTeachers}
          onRemove={onRemove}
          key={teacher.id}
          teacher={teacher}
        />
      ))}
    </div>
  );
}

export default TeacherList;
