import { useNavigate } from 'react-router-dom';
import UserRole from '../utils/types/UserRole';
import useUserRole from './useUserRole';
import { useEffect } from 'react';
import { useAppSelector } from '../redux/store';
import { selectUser } from '../redux/features/userSlice';

function useCheckLogin() {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/not-authorised');
    }
  }, [user]);
}

export default useCheckLogin;
