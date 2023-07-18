import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import Iconify from '../../../components/iconify';
import http from '../../../utils/http';
import { setAuthenticated, setUser } from '../../../redux/reducer/authenticatedReducer';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer);

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    http.get('/users').then((res) => {
      setUsers(res.data);
    });
  }, []);
  const handleClickLogin = () => {
    http
      .post('/auth/login', {
        username: userName,
        password: passWord,
      })
      .then((res) => {
        const findUser = users.find((user) => user.username === userName);
        toast.success('Đăng nhập thành công');

        // cap nhat thong tin vao redux
        dispatch(setAuthenticated(true));
        dispatch(
          setUser({
            ...user,
            userName: findUser.username,
            password: passWord,
            email: findUser.email,
            role: findUser.role,
          })
        );
      })
      .then(() => {
        navigate('/dashboard/app');
      })
      .catch(() => {
        toast.error('Email hoặc password không đúng');
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="Username" label="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <TextField
          name="password"
          label="Password"
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClickLogin}>
        Login
      </LoadingButton>
    </>
  );
}
