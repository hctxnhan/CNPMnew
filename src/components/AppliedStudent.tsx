import { Student } from '../utils/types/User';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import Button from './Button';
type AppliedStudentProps = {
  student: Student;
  onAccept: (student: Student) => void;
  onReject: (student: Student) => void;
};

function AppliedStudent({ student, onAccept, onReject }: AppliedStudentProps) {
  return (
    <div className='flex gap-2 bg-gray-50 p-3 rounded-lg hover:bg-gray-200'>
      <div className='flex-grow'>
        <div className=''>{student.name}</div>
        <div className='text-gray-500 text-sm'>{student.specialization}</div>
      </div>
      <div className='flex gap-1'>
        <Button onClick={() => onAccept(student)}>
          <AiOutlineCheck size={15} />
        </Button>
        <Button buttonType='danger' onClick={() => onReject(student)}>
          <AiOutlineClose size={15} />
        </Button>
      </div>
    </div>
  );
}

export default AppliedStudent;
