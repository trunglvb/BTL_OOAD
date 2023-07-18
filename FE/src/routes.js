import { Navigate, useRoutes, Outlet } from 'react-router-dom';
// layouts
import { useSelector } from 'react-redux';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import GiangVienPage from './pages/GiangVien';
import HocVienPage from './pages/HocVien';
import KhoaHocPage from './pages/KhoaHoc';
import LopHocPage from './pages/LopHoc';
import RegisterPage from './pages/RegisterPage';

// ----------------------------------------------------------------------

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);
  return isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />;
};
const RejectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.authReducer.isAuthenticated);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard/app" />;
};
export default function Router() {
  const routes = useRoutes([
    {
      path: '',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: '/dashboard/app', element: <DashboardAppPage />, index: true },
        { path: '/dashboard/user', element: <UserPage /> },
        { path: '/dashboard/giangVien', element: <GiangVienPage /> },
        { path: '/dashboard/hocVien', element: <HocVienPage /> },
        { path: '/dashboard/khoaHoc', element: <KhoaHocPage /> },
        { path: '/dashboard/lopHoc', element: <LopHocPage /> },
        { path: '/dashboard/caHoc', element: <ProductsPage /> },
        { path: '/dashboard/ngayHoc', element: <BlogPage /> },
      ],
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
      ],
    },
  ]);

  return routes;
}
