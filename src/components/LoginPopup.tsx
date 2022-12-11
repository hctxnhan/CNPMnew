import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signInUser } from "../firebase/auth";
import { useNotification } from "../hooks/useNotification";
import Button from "./Button";
import {
  errorNotificationCreator,
  successNotificationCreator,
} from "../utils/functions/notificationUtil";
function LoginPopup() {
  const { register, handleSubmit } = useForm();
  const showNotification = useNotification();
  async function onSubmit(data: any) {
    try {
      await signInUser(data.email, data.password);
      showNotification(successNotificationCreator("Đăng nhập thành công"));
    } catch (error) {
      showNotification(
        errorNotificationCreator(
          "Đăng nhập thất bại, vui lòng kiểm tra lại email và mật khẩu"
        )
      );
    }
  }

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:outline-none"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
          })}
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:outline-none"
          placeholder="Password"
          type="password"
          {...register("password", {
            required: true,
          })}
        />
        <div className="flex justify-between items-center">
          <Link className="text-gray-400 hover:text-gray-500 text-sm" to={""}>
            Quên mật khẩu?
          </Link>
          <Button type="submit">Đăng nhập</Button>
        </div>
      </form>
    </div>
  );
}

export default LoginPopup;
