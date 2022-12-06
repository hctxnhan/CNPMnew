import Specialization from './Specialization';
import { Educator, Student } from './User';

type Topic = {
  id: string;
  name: string;
  description?: string;
  specialization: Specialization;
  outcomes: string[];
  numberOfMembers: number;
  educatorId: string;
  members: string[];
  evaluationMembers: string[];
};

export default Topic;

