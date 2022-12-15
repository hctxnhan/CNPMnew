import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsBookmarkCheck, BsViewList } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase/auth";
import { selectUser } from "../redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import UserRole from "../utils/types/UserRole";
import Button from "./Button";
import LoginPopup from "./LoginPopup";
import { BsCalendarPlus } from "react-icons/bs";
import useUserRole from "../hooks/useUserRole";
import NavbarLink from "./NavbarLink";
import { openCreatePeriod } from "../redux/features/topicDetailSlice";
import CheckVisible from "./CheckVisible";
import { useNotification } from "../hooks/useNotification";
import {
  errorNotificationCreator,
  successNotificationCreator,
} from "../utils/functions/notificationUtil";

function Navbar() {
  const user = useAppSelector(selectUser);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const dispatch = useAppDispatch();
  const isAdmin = useUserRole(UserRole.ADMIN);
  const isStudent = useUserRole(UserRole.STUDENT);
  const isEducator = useUserRole(UserRole.EDUCATOR);
  const navigate = useNavigate();
  const showNotification = useNotification();
  useEffect(() => {
    const closeLoginPopup = (e: MouseEvent) => {
      //check if click outside login popup
      if (e.target instanceof Element && !e.target.closest(".login-popup"))
        setOpenLoginPopup(false);
      else console.log("click inside login popup or login popup isn't open");
    };

    window.addEventListener("click", closeLoginPopup);

    return () => {
      window.removeEventListener("click", closeLoginPopup);
    };
  }, []);

  return (
    <nav className="flex justify-between py-2 px-8 bg-white mb-2">
      <div className="flex items-center gap-5">
        <img
          className="w-[60px] object-cover object-center"
          src="https://cdn.haitrieu.com/wp-content/uploads/2021/09/Logo-DH-Su-Pham-Ky-Thuat-TP-Ho-Chi-Minh-HCMUTE.png"
          alt=""
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl uppercase font-semibold">
            Trang đăng ký đề tài
          </h1>
          <p className="text-xl text-gray-600">
            Khoa công nghệ thông tin - HCMUTE
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-2 items-center">
        {/* Danh sach de tai da dang ky hoac da tao */}
        <NavbarLink>
          <Link className="flex items-center gap-1" to={"/"}>
            <BsViewList />
            <p>Danh sách đề tài</p>
          </Link>
        </NavbarLink>

        {user && (
          <div>
            <CheckVisible allowedRoles={[UserRole.STUDENT]}>
              <NavbarLink>
                <Link className="flex items-center gap-1" to="/bookmarks">
                  <BsBookmarkCheck />
                  <p>Đề tài đã lưu</p>
                </Link>
              </NavbarLink>
            </CheckVisible>

            <CheckVisible allowedRoles={[UserRole.EDUCATOR]}>
              <NavbarLink>
                <Link className="flex items-center gap-1" to="/my-topics">
                  <BsBookmarkCheck />
                  <p>Đề tài của tôi</p>
                </Link>
              </NavbarLink>
            </CheckVisible>

            <CheckVisible allowedRoles={[UserRole.ADMIN]}>
              <div className="flex gap-2">
                <NavbarLink>
                  <button
                    onClick={() => {
                      dispatch(openCreatePeriod());
                    }}
                    className="flex items-center gap-1"
                  >
                    <BsCalendarPlus />
                    <p>Tạo đợt đăng ký</p>
                  </button>
                </NavbarLink>
                <NavbarLink>
                  <Link
                    className="flex items-center gap-1"
                    to="/account-management"
                  >
                    <AiOutlineUser />
                    <p>Quản lý tài khoản</p>
                  </Link>
                </NavbarLink>
              </div>
            </CheckVisible>

            <CheckVisible allowedRoles={[UserRole.HEAD_OF_DEPARTMENT]}>
              <NavbarLink>
                <Link
                  to="/specialization-topics"
                  className="flex items-center gap-1"
                >
                  <BsCalendarPlus />
                  <p>Đề tài thuộc bộ môn</p>
                </Link>
              </NavbarLink>
            </CheckVisible>
          </div>
        )}
        {/* Avatar */}
        {user ? (
          <Button
            onClick={async () => {
              try {
                await signOutUser();
                navigate("/");
                showNotification(
                  successNotificationCreator("Đăng xuất thành công")
                );
              } catch (err) {
                showNotification(
                  errorNotificationCreator("Đăng xuất thất bại")
                );
              }
            }}
          >
            ({user.name}) Đăng xuất
          </Button>
        ) : (
          <div
            onClick={(e) => {
              if (e.target !== e.currentTarget) return;
              setOpenLoginPopup(!openLoginPopup);
            }}
            className="relative login-popup cursor-pointer w-[40px] h-[40px] bg-emerald-500 rounded-full flex items-center justify-center"
          >
            <AiOutlineUser
              size={20}
              className="text-white pointer-events-none"
            />
            <div
              hidden={!openLoginPopup}
              className="absolute w-[350px] top-full right-0 mt-2 "
            >
              <LoginPopup />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
