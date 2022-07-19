import { lazy, Suspense } from 'react';
import Cookies from 'js-cookie';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import styles from './styles.module.scss';

import useProfile from 'hooks/useProfile';
import { TOKEN } from 'constants/auth';
import { routePaths } from 'constants/common';

const Sidebar = lazy(() => import('components/SideNavbar'));
const PageHeader = lazy(() => import('components/PageHeader'));
const PageNotFound = lazy(() => import('components/PageNotFound'));
const Home = lazy(() => import('pages/Home'));

const Tasks = lazy(() => import('pages/Tasks'));
const TaskDetail = lazy(() => import('pages/Tasks/TaskDetail'));

const AuthComponent = () => {
  const isAuthenticated = !!Cookies.get(TOKEN);
  const location = useLocation();
  // const { profile } = useProfile(isAuthenticated);

  const urlPaths = Object.values(routePaths);
  const isUrlPage = urlPaths.includes(location.pathname);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  // if (!profile) return null;

  return (
    <div className={styles.authWrapper}>
      {isUrlPage && <Sidebar />}

      <div className={styles.mainWrapper}>
        {isUrlPage && <PageHeader />}

        <div className={styles.pageContentWrapper}>
          <Suspense fallback={null}>
            <Routes>
              <Route path="*" element={<PageNotFound />} />
              <Route path={routePaths.home} element={<Home />} />

              <Route path={routePaths.tasks} element={<Tasks />} />
              <Route path={routePaths.taskDetail} element={<TaskDetail />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
