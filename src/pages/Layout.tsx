import { Outlet } from 'react-router-dom';
import styles from '../assets/scss/components/Layout.module.scss';
const Layout = () => {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  );
};

export default Layout;
