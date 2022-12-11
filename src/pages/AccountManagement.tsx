import { useEffect, useState } from 'react';
import AccountList from '../components/AccountList';
import NewTabs from '../components/NewTabs';
import TabPane from '../components/TabPane';
import Tabs from '../components/Tabs';
import { getAllUsers } from '../firebase/firestore';
import { TabsType } from '../utils/types/Tabs';
import User from '../utils/types/User';
import UserRole from '../utils/types/UserRole';
import { BiUserPlus } from 'react-icons/bi';
import Button from '../components/Button';
import CreateAccount from '../components/CreateAccount';
import Portal from '../components/Portal';
import useConfirmPopup from '../hooks/useConfirmPopup';
import WithOverlay from '../components/WithOverlay';
import CheckVisible from '../components/CheckVisible';
import NormalModal from '../components/NormalModal';

function AccountManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const creatingAccount = useConfirmPopup();
  console.log(creatingAccount.isOpen);
  useEffect(() => {
    getAllUsers().then((users) => {
      setUsers(users);
    });
    console.log(users);
  }, []);

  const tabs: TabsType[] = [];

  // loop through all user role enum typescript
  for (const role in UserRole) {
    const roleValue = UserRole[role as keyof typeof UserRole];

    if (roleValue === UserRole.GUEST) continue;

    const usersByRole = users.filter((user) => user.role === roleValue);
    tabs.push({
      name: roleValue,
      data: (
        <TabPane>
          <AccountList users={usersByRole} />
        </TabPane>
      ),
    });
  }

  return (
    <div>
      {/* <Portal wrapperId='popup'>
        <CheckVisible
          allowedRoles={[UserRole.ADMIN]}
          rules={creatingAccount.isOpen}
        >
          <WithOverlay>
            <NormalModal
              title='Tạo tài khoản mới'
              onClose={creatingAccount.onCancel}
            >
              <CreateAccount />
            </NormalModal>
          </WithOverlay>
        </CheckVisible>
      </Portal> */}
      {/* <div className='flex justify-end mb-2'>
        <Button onClick={creatingAccount.open}>
          <BiUserPlus className='mr-1' size={25} />
          <p>Tạo người dùng mới</p>
        </Button>
      </div> */}
      <NewTabs tabs={tabs} />
    </div>
  );
}

export default AccountManagement;
