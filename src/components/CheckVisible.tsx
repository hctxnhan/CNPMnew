import useUserRole from '../hooks/useUserRole';
import { selectUserRole } from '../redux/features/userSlice';
import { useAppSelector } from '../redux/store';
import UserRole from '../utils/types/UserRole';

type CheckVisibleProps = {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  rules?: boolean;
};

function CheckVisible({
  children,
  allowedRoles,
  rules = true,
}: CheckVisibleProps) {
  const userRole = useAppSelector(selectUserRole);

  // check if allowed roles contain GUEST
  const isAllowedGuest = allowedRoles.includes(UserRole.GUEST);

  // check if user role is allowed
  const isAllowed = allowedRoles.includes(userRole || UserRole.GUEST);

  let allowed = false;

  allowed = isAllowed || isAllowedGuest;

  return <>{allowed && rules && children}</>;
}

export default CheckVisible;
