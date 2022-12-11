import { Student } from "../utils/types/User";
import { useEffect, useState } from "react";
import {
  addStudentToTopic,
  getStudentListAppliedToTopic,
  onStudentListAppliedToTopicChange,
} from "../firebase/firestore";
import AppliedStudent from "./AppliedStudent";
import { useNotification } from "../hooks/useNotification";
import {
  errorNotificationCreator,
  successNotificationCreator,
} from "../utils/functions/notificationUtil";
type AppliedStudentListProps = {
  topicId: string;
  periodId: string;
};

function AppliedStudentList({ periodId, topicId }: AppliedStudentListProps) {
  const showNotification = useNotification();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // accept student will add the student to the topic and remove the student from the applied list

  function acceptStudent(student: Student) {
    console.log("accepting student", student);
    try {
      addStudentToTopic(periodId, topicId, student.id);
      showNotification(
        successNotificationCreator("Đã thêm sinh viên vào đề tài")
      );
    } catch (error) {
      showNotification(errorNotificationCreator("Đã có lỗi xảy ra"));
    }
  }

  // reject student will remove the student from the applied list
  function rejectStudent(student: Student) {
    console.log("rejecting student", student);
  }

  useEffect(() => {
    setLoading(true);
    setStudents([]);
    onStudentListAppliedToTopicChange(topicId, (students) => {
      setStudents(students);
      setLoading(false);
    });
  }, [topicId]);

  console.log(students);
  return (
    <div className="">
      {students.length > 0 ? (
        <div>
          {students.map((student) => (
            <AppliedStudent
              onAccept={acceptStudent}
              onReject={rejectStudent}
              key={student.id}
              student={student}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">Không có sinh viên nào</div>
      )}
    </div>
  );
}

export default AppliedStudentList;
