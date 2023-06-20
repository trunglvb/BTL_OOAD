// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Giảng viên',
    path: '/dashboard/giangVien',
    icon: icon('ic_user'),
  },
  {
    title: 'Học viên',
    path: '/dashboard/hocvien',
    icon: icon('ic_user'),
  },
  {
    title: 'Khóa học',
    path: '/dashboard/khoahoc',
    icon: icon('ic_cart'),
  },
  {
    title: 'Lớp học',
    path: '/dashboard/lophoc',
    icon: icon('ic_blog'),
  },
  {
    title: 'Ngày học',
    path: '/dashboard/ngayhoc',
    icon: icon('ic_blog'),
  },
  {
    title: 'Ca học',
    path: '/dashboard/cahoc',
    icon: icon('ic_blog'),
  },
  {
    title: 'Ngày học',
    path: '/dashboard/ngayhoc',
    icon: icon('ic_blog'),
  },
  {
    title: 'Kết quả',
    path: '/dashboard/login',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
