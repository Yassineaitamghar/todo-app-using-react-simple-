import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/user/index.js';

const UserGuest = ({ children }) => {
   const { user } = useSelector(selectUser);
   const isGuest = user && user.role === 'guest';

   if (isGuest) {
      return <Navigate to='/' replace />;
   }
   return <>{children ?? <Outlet />}</>;
};

export default UserGuest;
