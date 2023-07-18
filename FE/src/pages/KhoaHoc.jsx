import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
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
// components
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
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
  { id: 'tenKH', label: 'Tên Khóa', alignRight: false },
  { id: 'moTa', label: 'Mô tả', alignRight: false },
  { id: 'hocPhi', label: 'Học phí', alignRight: false },
  { id: 'soBuoi', label: 'Số buổi', alignRight: false },
  { id: 'status', label: 'Trạng thái', alignRight: false },
];

// ----------------------------------------------------------------------

export default function KhoaHocPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [isOpenEditPanel, setIsOpenEditPanel] = useState(false);
  const [idRemove, setIdRemove] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: '',
    count: 0,
    price: 0,
    desc: '',
    status: false,
    id: 0,
  });
  const [editUser, setEditUser] = useState({
    name: '',
    count: 0,
    price: 0,
    desc: '',
    status: false,
    id: 0,
  });
  const handleApprove = () => {
    http
      .post('/khoaHoc', {
        tenKH: courseInfo.name,
        soBuoi: Number(courseInfo.count),
        hocPhi: Number(courseInfo.price),
        moTa: courseInfo.desc,
        trangthai: courseInfo.status === '0',
      })
      .then(() => {
        toast.success('Thêm khóa học thành công');
        setIsOpenPanel(false);
        setIsLoading(true);
        setOpen(null);
        http.get('/khoaHoc').then((res) => {
          setData(res.data);
          setIsLoading(false);
        });
      })
      .catch(() => {
        setOpen(null);
        toast.error('Thêm khóa học không thành công');
        setIsOpenPanel(false);
      });
  };
  const handleUpdate = () => {
    http
      .put(`/khoaHoc/${idRemove}`, {
        tenKH: editUser.name,
        soBuoi: Number(editUser.count),
        hocPhi: Number(editUser.price),
        moTa: editUser.desc,
        trangthai: editUser.status === '0',
      })
      .then(() => {
        toast.success('Cập nhật khóa học thành công');
        setIsOpenEditPanel(false);
        setIsLoading(true);
        setOpen(null);
        http.get('/khoaHoc').then((res) => {
          setData(res.data);
          setIsLoading(false);
        });
      })
      .catch(() => {
        toast.error('Cập nhật khóa học không thành công');
        setIsOpenEditPanel(false);
        setOpen(null);
      });
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  useEffect(() => {
    setIsLoading(true);
    http.get('/khoaHoc').then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    http.get(`/khoaHoc/${idRemove}`).then((res) => {
      setEditUser({
        ...editUser,
        name: res.data.tenKH,
        count: res.data.soBuoi,
        price: res.data.hocPhi,
        status: res.data.trangthai,
        desc: res.data.moTa,
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
          <div className="popup-edit-wrap-kh">
            <Stack spacing={1.5}>
              <TextField
                label="Tên"
                value={editUser.name}
                onChange={(e) => {
                  setEditUser({
                    ...editUser,
                    name: e.target.value,
                  });
                }}
              />
              <TextField
                label="Số buổi"
                value={editUser.count}
                type="number"
                onChange={(e) => {
                  setEditUser({
                    ...editUser,
                    count: e.target.value,
                  });
                }}
              />
              <TextField
                label="Học phí"
                type="number"
                value={editUser.price}
                onChange={(e) => {
                  setEditUser({
                    ...editUser,
                    price: e.target.value,
                  });
                }}
              />
              <TextField
                label="Mô tả"
                value={editUser.desc}
                onChange={(e) => {
                  setEditUser({
                    ...editUser,
                    desc: e.target.value,
                  });
                }}
              />
              <TextField
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
                  setCourseInfo({
                    ...courseInfo,
                    name: e.target.value,
                  });
                }}
              />
              <TextField
                label="Số buổi"
                type="number"
                onChange={(e) => {
                  setCourseInfo({
                    ...courseInfo,
                    count: e.target.value,
                  });
                }}
              />
              <TextField
                label="Học phí"
                type="number"
                onChange={(e) => {
                  setCourseInfo({
                    ...courseInfo,
                    price: e.target.value,
                  });
                }}
              />
              <TextField
                label="Mô tả"
                onChange={(e) => {
                  setCourseInfo({
                    ...courseInfo,
                    desc: e.target.value,
                  });
                }}
              />
              <TextField
                label="Trạng thái"
                onChange={(e) => {
                  setCourseInfo({
                    ...courseInfo,
                    status: e.target.value,
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
            Khóa Học
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => {
              setIsOpenPanel(true);
            }}
          >
            Thêm Khóa Học
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={USERLIST.length} />
                {isLoading ? (
                  <span>Loading</span>
                ) : (
                  <TableBody>
                    {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                      <TableRow hover key={row.id} tabIndex={-1} role="checkbox">
                        <TableCell padding="checkbox" />

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {row.tenKH}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left" sx={{ maxWidth: 200 }}>
                          {row.moTa}
                        </TableCell>

                        <TableCell align="left">{row.hocPhi}</TableCell>

                        <TableCell align="left">{row.soBuoi}</TableCell>

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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
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
            http.delete(`/khoaHoc/${idRemove}`).then(() => {
              toast.success('Xoá khóa học thành công');
              setIsLoading(true);
              http.get('/khoaHoc').then((res) => {
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
