import Specialization from "../utils/types/Specialization";
import {
  Admin,
  Educator,
  Student,
  HeadOfDepartment,
} from "../utils/types/User";

import UserRole from "../utils/types/UserRole";

export const admin: Admin = {
  id: "1",
  name: "Admin Đường Văn Đạt",
  email: "",
  role: UserRole.ADMIN,
};

export const educators: Educator[] = [
  {
    id: "2",
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    role: UserRole.EDUCATOR,
    specialization: Specialization.SOFTWARE_ENGINEER,
  },
  {
    id: "3",
    name: "Nguyễn Thị B",
    email: "nguyenthib@gmail.com",
    role: UserRole.EDUCATOR,
    specialization: Specialization.COMPUTER_NETWORKING,
  },
  {
    id: "4",
    name: "Hoàng Công C",
    email: "",
    role: UserRole.EDUCATOR,
    specialization: Specialization.INFORMATION_TECHNOLOGY,
  },
  {
    id: "5",
    name: "Nguyễn Văn D",
    email: "",
    role: UserRole.EDUCATOR,
    specialization: Specialization.ARTIFICIAL_INTELLIGENCE,
  },
];

// export const students: Student[] = [
//   {
//     id: '5',
//     name: 'Hoàng Văn A',
//     email: '',
//     role: UserRole.STUDENT,
//     specialization: Specialization.SOFTWARE_ENGINEER,
//     bookmarkedTopics: {},
//   },
//   {
//     id: '6',
//     name: 'Kim Thị B',
//     email: '',
//     role: UserRole.STUDENT,
//     specialization: Specialization.SOFTWARE_ENGINEER,
//     bookmarkedTopics: {},
//   },
//   {
//     id: '7',
//     name: 'Nhã Thị C',
//     email: '',
//     role: UserRole.STUDENT,
//     specialization: Specialization.INFORMATION_TECHNOLOGY,
//     bookmarkedTopics: {},
//   },
//   {
//     id: '8',
//     name: 'Phương Thị D',
//     email: '',
//     role: UserRole.STUDENT,
//     specialization: Specialization.INFORMATION_TECHNOLOGY,
//     bookmarkedTopics: {},
//   },
//   {
//     id: '9',
//     name: 'Cung Thị E',
//     email: '',
//     role: UserRole.STUDENT,
//     specialization: Specialization.COMPUTER_NETWORKING,
//     bookmarkedTopics: {},
//   },
//   {
//     id: '9',
//     name: 'Trần Mộng F',
//     email: '',
//     role: UserRole.STUDENT,
//     specialization: Specialization.COMPUTER_NETWORKING,
//     bookmarkedTopics: {},
//   },
//   {
//     id: '9',
//     name: 'Dương Văn G',
//     email: '',
//     role: UserRole.STUDENT,
//     specialization: Specialization.ARTIFICIAL_INTELLIGENCE,
//     bookmarkedTopics: {},
//   },
//   {
//     id: '9',
//     name: 'Hạc Thị H',
//     email: '',
//     role: UserRole.STUDENT,
//     specialization: Specialization.ARTIFICIAL_INTELLIGENCE,
//     bookmarkedTopics: {},
//   },
// ];
