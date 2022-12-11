import { useAppSelector } from '../redux/store';
import { selectUser } from '../redux/features/userSlice';
import UserRole from '../utils/types/UserRole';

export default function useUserRole(role: UserRole): boolean {
  const user = useAppSelector(selectUser);
  if (!user) return false;
  return user.role === role;
}
