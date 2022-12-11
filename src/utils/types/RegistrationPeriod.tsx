import Topic from './Topic';

type RegistrationPeriod = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  topics: Topic[];
};

export default RegistrationPeriod;
