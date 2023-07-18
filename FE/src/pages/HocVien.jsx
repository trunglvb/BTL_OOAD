import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { toast } from 'react-toastify';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import http from '../utils/http';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'tenHV', label: 'Tên', alignRight: false },
  { id: 'ngaySinhHV', label: 'Ngày Sinh', alignRight: false },
  { id: 'gioiTinhHV', label: 'Giới tính', alignRight: false },
  { id: 'diaChiHV', label: 'Địa chỉ', alignRight: false },
  { id: 'sdtHV', label: 'SĐT', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function HocVienPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userInfo, setUserInfo] = useState({
    name: '',
    date: '',
    sex: false,
    phone: '',
    address: '',
    id: 0,
  });
  const [editUser, setEditUser] = useState({
    name: '',
    date: '',
    sex: false,
    phone: '',
    address: '',
    id: 0,
  });
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [isOpenEditPanel, setIsOpenEditPanel] = useState(false);
  const [idRemove, setIdRemove] = useState(0);

  const handleApprove = () => {
    http
      .post('/hocVien', {
        tenHV: userInfo.name,
        ngaySinhHV: userInfo.date,
        gioiTinhHV: userInfo.sex === 'NAM',
        sdtHV: userInfo.phone,
        diaChiHV: userInfo.address,
        userId: userInfo.id,
      })
      .then(() => {
        toast.success('Thêm học viên thành công');
        setIsOpenPanel(false);
        setOpen(null);
        setIsLoading(true);
        http.get('/hocVien').then((res) => {
          setData(res.data);
          setIsLoading(false);
        });
      })
      .catch(() => {
        toast.error('Thêm học viên không thành công');
        setIsOpenPanel(false);
        setOpen(null);
      });
  };
  const handleUpdate = () => {
    http
      .put(`/hocVien/${idRemove}`, {
        tenHV: editUser.name,
        ngaySinhHV: editUser.date,
        gioiTinhHV: editUser.sex,
        sdtHV: editUser.phone,
        diaChiHV: editUser.address,
        userId: editUser.id,
      })
      .then(() => {
        toast.success('Cập nhật viên thành công');
        setIsOpenEditPanel(false);
        setIsLoading(true);
        setOpen(null);
        http.get('/hocVien').then((res) => {
          setData(res.data);
          setIsLoading(false);
        });
      })
      .catch(() => {
        setOpen(null);
        toast.warn('Cập nhật viên không thành công');
        setIsOpenEditPanel(false);
      });
  };
  useEffect(() => {
    setIsLoading(true);
    http.get('/hocVien').then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    http.get(`/hocVien/${idRemove}`).then((res) => {
      setEditUser({
        ...editUser,
        name: res.data.tenHV,
        date: res.data.ngaySinhHV,
        phone: res.data.sdtHV,
        address: res.data.diaChiHV,
        id: res.data.user.id,
        sex: res.data.gioiTinhHV,
      });
    });
  }, [idRemove]);
  return (
    <>
      {isOpenEditPanel && (
        <Popover
          open={Boolean(isOpenEditPanel)}
          anchorEl={isOpenEditPanel}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              p: 1,
              position: 'fixed',
              inset: 0,
              width: '100vw',
              display: 'flex',
              backgroundColor: 'rgba(0,0,0,0.5)',
              '& .MuiMenuItem-root': {
                px: 1,
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }}
        >
          <div className="popup-edit-wrap">
            <Stack spacing={1.5}>
              <TextField
                value={editUser.name}
                label="Tên"
                onChange={(e) => {
                  setEditUser({
                    ...editUser,
                    name: e.target.value,
                  });
                }}
              />
              <TextField
                label="Ngày sinh"
                value={editUser.date}
                onChange={(e) => {
                  setEditUser({
                    ...editUser,
                    date: e.target.value,
                  });
                }}
              />
              <TextField
                label="Số điện thoại"
                value={editUser.phone}
                onChange={(e) => {
                  setEditUser({
                    ...editUser,
                    phone: e.target.value,
                  });
                }}
              />
              <TextField
                label="Địa chỉ"
                value={editUser.address}
                onChange={(e) => {
                  setEditUser({
                    ...editUser,
                    address: e.target.value,
                  });
                }}
              />
              <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleUpdate}>
                Approve
              </LoadingButton>
              <Button
                onClick={() => {
                  setIsOpenEditPanel(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </div>
        </Popover>
      )}
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>
      {isOpenPanel && (
        <Popover
          open={Boolean(isOpenPanel)}
          anchorEl={isOpenPanel}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              p: 1,
              position: 'fixed',
              inset: 0,
              width: '100vw',
              display: 'flex',
              backgroundColor: 'rgba(0,0,0,0.5)',
              '& .MuiMenuItem-root': {
                px: 1,
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }}
        >
          <div className="popup-wrap">
            <Stack spacing={1.5}>
              <TextField
                label="Tên"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    name: e.target.value,
                  });
                }}
              />
              <TextField
                label="Ngày sinh"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    date: e.target.value,
                  });
                }}
              />
              <TextField
                label="Giới tính"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    sex: e.target.value,
                  });
                }}
              />
              <TextField
                label="Số điện thoại"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    phone: e.target.value,
                  });
                }}
              />
              <TextField
                label="Địa chỉ"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    address: e.target.value,
                  });
                }}
              />
              <TextField
                label="User ID"
                type="number"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    id: e.target.value,
                  });
                }}
              />
              <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleApprove}>
                Approve
              </LoadingButton>
              <Button
                onClick={() => {
                  setIsOpenPanel(false);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </div>
        </Popover>
      )}
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Học Viên
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => {
              setIsOpenPanel(true);
            }}
          >
            Thêm Học Viên
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead order={order} headLabel={TABLE_HEAD} rowCount={data.length} />
                {isLoading ? (
                  <span>Loading</span>
                ) : (
                  <TableBody>
                    {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                      <TableRow hover key={row.id} tabIndex={-1} role="checkbox">
                        <TableCell padding="checkbox" />

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={row.tenHV} src={`/assets/images/avatars/avatar_${index + 1}.jpg`} />
                            <Typography variant="subtitle2" noWrap>
                              {row.tenHV}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{row.ngaySinhHV}</TableCell>
                        <TableCell align="left">{row.gioiTinhHV === true ? 'Nam' : 'Nữ'}</TableCell>
                        <TableCell align="left">{row.diaChiHV}</TableCell>

                        <TableCell align="left">
                          {row.sdtHV}
                          <IconButton
                            style={{
                              marginLeft: '40px',
                            }}
                            size="large"
                            color="inherit"
                            onClick={(event) => {
                              handleOpenMenu(event);
                              setIdRemove(row.id);
                            }}
                          >
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            setIsOpenEditPanel(true);
          }}
        >
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          sx={{ color: 'error.main' }}
          onClick={() => {
            http.delete(`/hocVien/${idRemove}`).then(() => {
              toast.success('Xoá học viên thành công');
              setIsLoading(true);
              http.get('/hocVien').then((res) => {
                setData(res.data);
                setIsLoading(false);
              });
            });
          }}
        >
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
