import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import http from '../../../utils/http';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [email, setEmail] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState(false);

  const handleClick = () => {
    http
      .post('/users', {
        username: userName,
        password: passWord,
        email,
        role,
      })
      .then(() => {
        toast.success('Đăng kí thành công');
        navigate('/login');
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="Username" label="Username" onChange={(e) => setUserName(e.target.value)} />
        <TextField name="email" label="Email" onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
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
        <TextField name="Confirm Password" label="Confirm Password" onChange={(e) => setConfirm(e.target.value)} />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />
      <div>
        <input type="checkbox" label="Admin" checked={role} onChange={(e) => setRole(e.target.checked)} />
        Admin
      </div>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        disabled={userName === '' || email === '' || passWord === '' || confirm === '' || passWord !== confirm}
      >
        Register
      </LoadingButton>
    </>
  );
}
