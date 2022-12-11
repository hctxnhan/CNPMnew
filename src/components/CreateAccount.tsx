import { Controller, useForm } from 'react-hook-form';
import { createUser } from '../firebase/auth';
import { SelectOptionType } from '../utils/types/SelectOptionType';
import Specialization from '../utils/types/Specialization';
import User from '../utils/types/User';
import UserRole from '../utils/types/UserRole';
import Button from './Button';
import Input from './Input';
import SelectInput from './SelectInput';

type FormValues = {
  name: string;
  email: string;
  role: string;
  specialization: string;
  password: string;
};

function CreateAccount() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      role: '',
      specialization: '',
      password: '',
    },
  });

  const allRoles: SelectOptionType[] = [];
  for (const role in UserRole) {
    const value = UserRole[role as keyof typeof UserRole];
    if (value === UserRole.GUEST) continue;
    allRoles.push({ value });
  }

  const allSpecializations: SelectOptionType[] = [];
  for (const specialization in Specialization) {
    const label = Specialization[specialization as keyof typeof Specialization];
    const value = specialization;
    allSpecializations.push({ value, label });
  }
  console.log('allRoles', allRoles, 'allSpecializations', allSpecializations);

  function onSubmit(data: FormValues) {
    console.log(data);
    const { name, email, role, specialization, password } = data;
    const newPassword: string = password === '' ? '12345678' : password;
    const user: User = {
      id: '',
      name,
      email,
      role: role as UserRole,
      specialization:
        Specialization[specialization as keyof typeof Specialization],
    };
    console.log('user', user);
    createUser(email, newPassword, user);
  }

  return (
    <div>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='role'
          control={control}
          render={({ field: { onChange } }) => (
            <SelectInput options={allRoles} onChange={onChange} />
          )}
        />

        <Controller
          name='name'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input {...field} type='text' placeholder='Họ và tên' />
          )}
        />

        <div className='grid grid-cols-2 gap-2'>
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input {...field} type='email' placeholder='Email' />
            )}
          />

          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type='text'
                placeholder='Mật khẩu (mặc định: 12345678)'
              />
            )}
          />
        </div>
        <Controller
          name='specialization'
          control={control}
          render={({ field: { onChange } }) => (
            <SelectInput options={allSpecializations} onChange={onChange} />
          )}
        />
        <Button type='submit'>Thêm tài khoản</Button>
      </form>
    </div>
  );
}

export default CreateAccount;
