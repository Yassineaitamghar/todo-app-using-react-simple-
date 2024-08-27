// PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import Utils from '../../../common/utils';

const UserOnline = ({ children }) => {
   const isLoggedIn = Utils.getAccessToken();

   if (!isLoggedIn) {
      return <Navigate to='/login' replace />;
   }

   return <>{children ?? <Outlet />}</>;
};

export default UserOnline;
