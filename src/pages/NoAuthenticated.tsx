import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useCheckLogin from '../hooks/useCheckLogin';

function NoAuthenticated() {
  const navigate = useNavigate();
  const isLoggedIn = useCheckLogin();

  useEffect(() => {
    const id = setTimeout(() => {
      navigate('/');
    }, 3000);
    return () => {
      clearTimeout(id);
    };
  }, []);

  return <div>Lỗi: Chưa đăng nhập vào hệ thống! Đang quay về trang chủ!</div>;
}

export default NoAuthenticated;
