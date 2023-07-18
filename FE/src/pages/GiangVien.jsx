import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState, useSyncExternalStore } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Popover,
  TableRow,
  TextField,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { toast } from 'react-toastify';
import { id } from 'date-fns/locale';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import http from '../utils/http';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'tenGV', label: 'Tên', alignRight: false },
  { id: 'ngaySinhGV', label: 'Ngày Sinh', alignRight: false },
  { id: 'gioiTinhGV', label: 'Giới tính', alignRight: false },
  { id: 'sdtGV', label: 'SĐT', alignRight: false },
  { id: 'trangthai', label: 'Trạng thái', alignRight: false },
];

// ----------------------------------------------------------------------
export default function GiangVienPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userInfo, setUserInfo] = useState({
    name: '',
    date: '',
    sex: false,
    phone: '',
    status: false,
    id: 0,
  });
  const [editUser, setEditUser] = useState({
    name: '',
    date: '',
    sex: false,
    phone: '',
    status: false,
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleApprove = () => {
    http
      .post('/giaoVien', {
        tenGV: userInfo.name,
        ngaySinhGV: userInfo.date,
        gioiTinhGV: userInfo.sex === 'NAM',
        sdtGV: userInfo.phone,
        trangthai: userInfo.status === '0',
        userId: userInfo.id,
      })
      .then(() => {
        toast.success('Thêm giáo viên thành công');
        setIsOpenPanel(false);
        setIsLoading(true);
        http.get('/giaoVien').then((res) => {
          setData(res.data);
          setIsLoading(false);
        });
      })
      .catch(() => {
        toast.error('Thêm giáo viên không thành công');
        setIsOpenPanel(false);
      });
  };
  const handleUpdate = () => {
    http
      .put(`/giaoVien/${idRemove}`, {
        tenGV: editUser.name,
        ngaySinhGV: editUser.date,
        gioiTinhGV: editUser.sex,
        sdtGV: editUser.phone,
        trangthai: editUser.status === '0',
        userId: editUser.id,
      })
      .then(() => {
        toast.success('Cập nhật giáo viên thành công');
        setIsOpenEditPanel(false);
        setIsLoading(true);
        http.get('/giaoVien').then((res) => {
          setData(res.data);
          setIsLoading(false);
        });
      })
      .catch(() => {
        toast.warn('Cập nhật viên không thành công');
        setIsOpenEditPanel(false);
      });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [isOpenEditPanel, setIsOpenEditPanel] = useState(false);
  const [idRemove, setIdRemove] = useState(0);

  // goi api tat ca giang vien
  useEffect(() => {
    setIsLoading(true);
    http.get('/giaoVien').then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  // goi api theo id
  useEffect(() => {
    http.get(`/giaoVien/${idRemove}`).then((res) => {
      setEditUser({
        ...editUser,
        name: res.data.tenGV,
        date: res.data.ngaySinhGV,
        phone: res.data.sdtGV,
        status: res.data.trangthai,
        id: res.data.user.id,
        sex: res.data.gioiTinhGV,
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
                name="Username"
                label="Trạng thái"
                value={editUser.status}
                onChange={(e) => {
                  setEditUser({
                    ...editUser,
                    status: e.target.value,
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
                label="Trạng thái"
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    status: e.target.value,
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
            Giảng Viên
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => {
              setIsOpenPanel(true);
            }}
          >
            Thêm Giảng Viên
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                  onRequestSort={handleRequestSort}
                />
                {isLoading ? (
                  <span>Loading</span>
                ) : (
                  <TableBody>
                    {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                      <TableRow hover key={row.id} tabIndex={-1} role="checkbox">
                        <TableCell padding="checkbox" />

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={row.tenGV} src={`/assets/images/avatars/avatar_${index + 1}.jpg`} />
                            <Typography variant="subtitle2" noWrap>
                              {row.tenGV}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{row.ngaySinhGV}</TableCell>

                        <TableCell align="left">{row.gioiTinhGV === true ? 'Nam' : 'Nữ'}</TableCell>

                        <TableCell align="left">{row.sdtGV}</TableCell>

                        <TableCell align="left">
                          <Label color={row.trangthai === true && 'success'}>
                            {row.trangthai === true ? 'Active' : 'Off'}
                          </Label>
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
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
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
            http
              .delete(`/giaoVien/${idRemove}`)
              .then(() => {
                toast.success('Xoá giảng viên thành công');
                setIsLoading(true);
                http.get('/giaoVien').then((res) => {
                  setData(res.data);
                  setIsLoading(false);
                });
              })
              .catch(() => {
                toast.error('Xoá giảng viên không thành công');
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
