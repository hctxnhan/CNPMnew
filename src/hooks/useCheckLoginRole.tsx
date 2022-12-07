import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserRole from '../utils/types/UserRole';
import useUserRole from './useUserRole';

function useCheckLoginRole(role: UserRole) {
  const isRole = useUserRole(role);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRole) {
      navigate('/not-authorised');
    }
  }, [isRole]);
}

export default useCheckLoginRole;
