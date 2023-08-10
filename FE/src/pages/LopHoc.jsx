import { Helmet } from 'react-helmet-async';
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
  TextField,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
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
import http from '../utils/http';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'tenLop', label: 'Tên Lớp', alignRight: false },
  { id: 'ngayBD', label: 'Ngày BĐ', alignRight: false },
  { id: 'ngayKT', label: 'Ngày KT', alignRight: false },
  { id: 'siSo', label: 'Sĩ số', alignRight: false },
  { id: 'khoaHoc', label: 'Khóa học', alignRight: false },
  { id: 'tenGV', label: 'Giảng viên', alignRight: false },
  { id: 'caHoc', label: 'Ca học', alignRight: false },
  { id: 'ngayHoc', label: 'Ngày học', alignRight: false },
  { id: 'trangThai', label: 'Trạng thái', alignRight: false },
];

export default function LopHocPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPanel, setIsOpenPanel] = useState(false);
  const [isOpenEditPanel, setIsOpenEditPanel] = useState(false);
  const [idRemove, setIdRemove] = useState(0);
  const [classInfo, setClassInfo] = useState({
    tenLop: '',
    ngayBD: '',
    ngayKT: '',
    siSo: 0,
    trangThai: '',
    maKH: 0,
    maGV: 0,
    maCH: 0,
    maNH: 0,
  });
  const [editClassInfo, setEditClassInfo] = useState({
    tenLop: '',
    ngayBD: '',
    ngayKT: '',
    siSo: 0,
    trangThai: '',
    maKH: 0,
    maGV: 0,
    maCH: 0,
    maNH: 0,
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

  useEffect(() => {
    setIsLoading(true);
    http.get('/lopHoc').then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    http.get(`/lopHoc/${idRemove}`).then((res) => {
      setEditClassInfo({
        ...setEditClassInfo,
        tenLop: res.data.tenLop,
        ngayBD: res.data.ngayBD,
        ngayKT: res.data.ngayKT,
        siSo: res.data.siSo,
        trangThai: res.data.trangThai,
        maKH: res.data.maKH,
        maGV: res.data.maGV,
        maCH: res.data.maCH,
        maNH: res.data.maNH,
      });
    });
  }, [idRemove]);

  const handleApprove = () => {
    http
      .post('/lopHoc', {
        tenLop: classInfo.tenLop,
        ngayBD: classInfo.ngayBD,
        ngayKT: classInfo.ngayKT,
        siSo: Number(classInfo.siSo),
        trangThai: classInfo.trangThai,
        maKH: Number(classInfo.maKH),
        maGV: Number(classInfo.maGV),
        maCH: Number(classInfo.maCH),
        maNH: Number(classInfo.maNH),
      })
      .then(() => {
        toast.success('Thêm lớp học thành công');
        setIsOpenPanel(false);
        setIsLoading(true);
        setOpen(null);
        http.get('/lopHoc').then((res) => {
          setData(res.data);
          setIsLoading(false);
        });
      })
      .catch(() => {
        setOpen(null);
        toast.error('Thêm lớp học không thành công');
        setIsOpenPanel(false);
      });
  };

  const handleUpdate = () => {
    http
      .put(`/lopHoc/${idRemove}`, {
        tenLop: editClassInfo.tenLop,
        ngayBD: editClassInfo.ngayBD,
        ngayKT: editClassInfo.ngayKT,
        siSo: Number(editClassInfo.siSo),
        trangThai: editClassInfo.trangThai,
        maKH: Number(editClassInfo.maKH),
        maGV: Number(editClassInfo.maGV),
        maCH: Number(editClassInfo.maCH),
        maNH: Number(editClassInfo.maNH),
      })
      .then(() => {
        toast.success('Cập nhật lớp học thành công');
        setIsOpenEditPanel(false);
        setIsLoading(true);
        setOpen(null);
        http.get('/lopHoc').then((res) => {
          setData(res.data);
          setIsLoading(false);
        });
      })
      .catch(() => {
        toast.error('Cập nhật lớp học không thành công');
        setIsOpenEditPanel(false);
        setOpen(null);
      });
  };

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
          <div className="popup-wrap-lh">
            <Stack spacing={1.5}>
              <TextField
                label="Tên lớp"
                value={editClassInfo.tenLop}
                onChange={(e) => {
                  setEditClassInfo({
                    ...editClassInfo,
                    tenLop: e.target.value,
                  });
                }}
              />
              <TextField
                label="Ngày bắt đầu"
                value={editClassInfo.ngayBD}
                onChange={(e) => {
                  setEditClassInfo({
                    ...editClassInfo,
                    ngayBD: e.target.value,
                  });
                }}
              />
              <TextField
                label="Ngày kết thúc"
                value={editClassInfo.ngayKT}
                onChange={(e) => {
                  setEditClassInfo({
                    ...editClassInfo,
                    ngayKT: e.target.value,
                  });
                }}
              />
              <TextField
                label="Sĩ số"
                type="number"
                value={editClassInfo.siSo}
                onChange={(e) => {
                  setEditClassInfo({
                    ...editClassInfo,
                    siSo: e.target.value,
                  });
                }}
              />
              <TextField
                label="Trạng thái"
                value={editClassInfo.trangThai}
                onChange={(e) => {
                  setEditClassInfo({
                    ...editClassInfo,
                    trangThai: e.target.value,
                  });
                }}
              />
              <TextField
                label="Mã khóa học"
                type="number"
                value={editClassInfo.maKH}
                onChange={(e) => {
                  setEditClassInfo({
                    ...editClassInfo,
                    maKH: e.target.value,
                  });
                }}
              />
              <TextField
                label="Mã giảng viên"
                type="number"
                value={editClassInfo.maGV}
                onChange={(e) => {
                  setEditClassInfo({
                    ...editClassInfo,
                    maGV: e.target.value,
                  });
                }}
              />
              <TextField
                label="Mã ca học"
                type="number"
                value={editClassInfo.maCH}
                onChange={(e) => {
                  setEditClassInfo({
                    ...editClassInfo,
                    maCH: e.target.value,
                  });
                }}
              />
              <TextField
                label="Mã ngày học"
                type="number"
                value={editClassInfo.maNH}
                onChange={(e) => {
                  setEditClassInfo({
                    ...e,
                    maNH: e.target.value,
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
          <div className="popup-wrap-lh">
            <Stack spacing={1.5}>
              <TextField
                label="Tên lớp"
                onChange={(e) => {
                  setClassInfo({
                    ...classInfo,
                    tenLop: e.target.value,
                  });
                }}
              />
              <TextField
                label="Ngày bắt đầu"
                onChange={(e) => {
                  setClassInfo({
                    ...classInfo,
                    ngayBD: e.target.value,
                  });
                }}
              />
              <TextField
                label="Ngày kết thúc"
                onChange={(e) => {
                  setClassInfo({
                    ...classInfo,
                    ngayKT: e.target.value,
                  });
                }}
              />
              <TextField
                label="Sĩ số"
                type="number"
                onChange={(e) => {
                  setClassInfo({
                    ...classInfo,
                    siSo: e.target.value,
                  });
                }}
              />
              <TextField
                label="Trạng thái"
                onChange={(e) => {
                  setClassInfo({
                    ...classInfo,
                    trangThai: e.target.value,
                  });
                }}
              />
              <TextField
                label="Mã khóa học"
                type="number"
                onChange={(e) => {
                  setClassInfo({
                    ...classInfo,
                    maKH: e.target.value,
                  });
                }}
              />
              <TextField
                label="Mã giảng viên"
                type="number"
                onChange={(e) => {
                  setClassInfo({
                    ...classInfo,
                    maGV: e.target.value,
                  });
                }}
              />
              <TextField
                label="Mã ca học"
                type="number"
                onChange={(e) => {
                  setClassInfo({
                    ...classInfo,
                    maCH: e.target.value,
                  });
                }}
              />
              <TextField
                label="Mã ngày học"
                type="number"
                onChange={(e) => {
                  setClassInfo({
                    ...classInfo,
                    maNH: e.target.value,
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
            Lớp Học
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => {
              setIsOpenPanel(true);
            }}
          >
            Thêm Lớp Học
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={data.length} />
                {isLoading ? (
                  <span>Loading</span>
                ) : (
                  <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                      <TableRow hover key={row.id} tabIndex={-1}>
                        <TableCell padding="checkbox" />
                        <TableCell align="left">{row.tenLop}</TableCell>
                        <TableCell align="left">{row.ngayBD}</TableCell>
                        <TableCell align="left">{row.ngayKT}</TableCell>
                        <TableCell align="left">{row.siSo}</TableCell>
                        <TableCell align="left" sx={{ maxWidth: 150 }}>
                          {row.khoaHoc.tenKH}
                        </TableCell>
                        <TableCell align="left">{row.giaoVien.tenGV}</TableCell>

                        <TableCell align="left">{row.caHoc.gioHoc}</TableCell>
                        <TableCell align="left">{row.ngayHoc.ngayHoc}</TableCell>
                        <TableCell align="left">
                          {row.trangThai}{' '}
                          <IconButton
                            size="small"
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
            http.delete(`/lopHoc/${idRemove}`).then(() => {
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
