import Specialization from './Specialization'
import UserRole from './UserRole'
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  specialization?: Specialization
}

export interface Educator extends User {
  role: UserRole.EDUCATOR
  specialization: Specialization
}

export type BookmarkTopics = {
  [topicId: string]: string[]
}

export interface Student extends User {
  role: UserRole.STUDENT
  bookmarkedTopics: BookmarkTopics
  appliedTopics: string[]
}

export interface Admin extends User {
  role: UserRole.ADMIN
}

export interface HeadOfDepartment extends User {
  role: UserRole.HEAD_OF_DEPARTMENT
}

export default User
