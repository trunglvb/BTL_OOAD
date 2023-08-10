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
import http from '../utils/http';

// ----------------------------------------------------------------------

const TABLE_HEAD = [{ id: 'gioHoc', label: 'Ca Học', alignRight: false }];

// ----------------------------------------------------------------------
export default function CaHocPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [idRemove, setIdRemove] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    http.get('/caHoc').then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ca học
          </Typography>
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
                        <TableCell align="left">
                          <Label>{row.gioHoc}</Label>
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
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
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
          sx={{ color: 'error.main' }}
          onClick={() => {
            http
              .delete(`/caHoc/${idRemove}`)
              .then(() => {
                toast.success('Xoá ca học thành công');
                setIsLoading(true);
                http.get('/caHoc').then((res) => {
                  setData(res.data);
                  setIsLoading(false);
                });
              })
              .catch(() => {
                toast.error('Xoá ca học không thành công');
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
