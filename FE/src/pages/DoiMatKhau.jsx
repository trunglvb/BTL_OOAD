import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Stack, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import http from '../utils/http';

const DoiMatKhauPage = () => {
  const user = useSelector((state) => state.authReducer);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassWord, setNewPassWord] = useState('');
  const navigate = useNavigate();

  const handleApprove = () => {
    if (oldPassword === user.user.password) {
      http
        .put(`/users/${user.user.id}`, {
          username: user.user.userName,
          password: newPassWord,
          email: user.user.email,
          role: user.user.role,
        })
        .then(() => {
          toast.success('Cập nhật mật khẩu thành công');
          navigate('/dashboard/app');
        })
        .catch(() => {
          toast.error('Cập nhật mật khẩu không thành công');
        });
    } else {
      toast.warning('Mật khẩu cũ không chính xác');
    }
  };

  return (
    <div>
      <div className="popup-edit-wrap-1">
        <Typography variant="h4" gutterBottom>
          Đổi mật khẩu
        </Typography>
        <Stack spacing={1.5}>
          <TextField label={'Email'} onChange={(e) => {}} disabled value={user.user.email} />
          <TextField
            label="Password"
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
            type="password"
            value={oldPassword}
          />
          <TextField
            label="New Password"
            type="password"
            value={newPassWord}
            onChange={(e) => {
              setNewPassWord(e.target.value);
            }}
          />
          {/* <TextField type="password" label="Confirm New Password" onChange={(e) => {}} /> */}

          <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleApprove}>
            Approve
          </LoadingButton>
        </Stack>
      </div>
    </div>
  );
};
export default DoiMatKhauPage;
