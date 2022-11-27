import RegistrationPeriod from '../types/RegistrationPeriod';

function checkIfPeriodActive(period: RegistrationPeriod) {
  const currentDate = new Date();
  const startDate = new Date(+period.startDate * 1000);
  const endDate = new Date(+period.endDate * 1000);
  return currentDate > startDate && currentDate < endDate;
}

export default checkIfPeriodActive;
