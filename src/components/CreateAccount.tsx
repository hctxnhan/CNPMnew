import { Controller, useForm } from "react-hook-form";
import { createUser } from "../firebase/auth";
import { SelectOptionType } from "../utils/types/SelectOptionType";
import Specialization from "../utils/types/Specialization";
import User from "../utils/types/User";
import UserRole from "../utils/types/UserRole";
import Button from "./Button";
import Input from "./Input";
import SelectInput from "./SelectInput";
import { useNotification } from "../hooks/useNotification";
import {
  errorNotificationCreator,
  successNotificationCreator,
} from "../utils/functions/notificationUtil";

type FormValues = {
  name: string;
  role: string;
  specialization: string;
  uid: string;
  email: string;
};

function CreateAccount() {
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      role: "",
      specialization: "",
      uid: "",
    },
  });

  const showNotification = useNotification();

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

  function onSubmit(data: FormValues) {
    const { name, role, specialization, email, uid } = data;
    const user: User = {
      id: uid,
      name,
      email: email,
      role: role as UserRole,
      specialization:
        Specialization[specialization as keyof typeof Specialization],
    };
    createUser(user)
      .then(() => {
        showNotification(
          successNotificationCreator("Tạo tài khoản thành công")
        );
        reset();
      })
      .catch((error) => {
        showNotification(errorNotificationCreator("Tạo tài khoản thất bại"));
      });
  }

  return (
    <div>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="role"
          control={control}
          render={({ field: { onChange } }) => (
            <SelectInput options={allRoles} onChange={onChange} />
          )}
        />

        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input {...field} type="text" placeholder="Họ và tên" />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input {...field} type="text" placeholder="Email" />
          )}
        />

        <Controller
          name="specialization"
          control={control}
          render={({ field: { onChange } }) => (
            <SelectInput options={allSpecializations} onChange={onChange} />
          )}
        />

        <Controller
          name="uid"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input {...field} type="text" placeholder="User ID" />
          )}
        />
        <Button type="submit">Thêm tài khoản</Button>
      </form>
    </div>
  );
}

export default CreateAccount;
