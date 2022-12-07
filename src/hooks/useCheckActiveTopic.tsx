// * Sprint 2 day 2 Loc

import {
  selectPeriodById,
  selectTopicById,
  selectTopicPeriodId,
} from '../redux/features/topicSlice';
import { useAppSelector } from '../redux/store';
import checkIfPeriodActive from '../utils/functions/CheckIfPeriodACtive';

function useCheckActiveTopic(topicId: string) {
  const periodId = useAppSelector((state) =>
    selectTopicPeriodId(state, topicId)
  );

  const period = useAppSelector((state) => selectPeriodById(state, periodId));
  if (!period) return false;

  return checkIfPeriodActive(period);
}

export default useCheckActiveTopic;
