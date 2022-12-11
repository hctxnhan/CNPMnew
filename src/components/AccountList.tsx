import { useState, useEffect } from 'react';
import { getAllUsers } from '../firebase/firestore';
import User from '../utils/types/User';
import UserComponent from './UserComponent';

type AccountListProps = {
  users: User[];
};

function AccountList({ users }: AccountListProps) {
  return (
    <div className='grid grid-cols-3 gap-3'>
      {users.map((user) => (
        <div>
          <UserComponent
            userData={user}
            className='hover:transform hover:-translate-y-1 hover:bg-emerald-600 hover:text-white transition-all cursor-pointer shadow-md shadow-gray-300'
          />
        </div>
      ))}
    </div>
  );
}

export default AccountList;
