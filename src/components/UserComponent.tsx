import { getUser } from '../firebase/firestore';
import User from '../utils/types/User';
import { useState, useEffect } from 'react';

type UserComponentProps = {
  userId?: string;
  userData?: User;
  className?: string;
};

function UserComponent({ userId, userData, className }: UserComponentProps) {
  const [user, setUser] = useState<User | null>(userData ? userData : null);

  useEffect(() => {
    if (userId) {
      getUser(userId).then((user) => {
        setUser(user);
      });
    }
  }, [userId]);

  return (
    <>
      {user && (
        <div className={`bg-gray-100 p-4 py-3 rounded-md ${className}`}>
          <h1 className='uppercase text-xs font-bold'>{user.name}</h1>
          <p className='capitalize text-xs'>{user.role}</p>
          <p className='capitalize text-xs'>{user.specialization}</p>
          <p className='lowercase text-[10px] tracking-wide'>{user.email}</p>
        </div>
      )}
    </>
  );
}

export default UserComponent;
