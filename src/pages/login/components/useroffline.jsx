// PrivateRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import Utils from '../../../common/utils';

const UserOffline = ({ children }) => {
   const isLoggedIn = Utils.getAccessToken();

   if (isLoggedIn) {
      return <Navigate to='/' replace />;
   }

   return <>{children ?? <Outlet />}</>;
};

export default UserOffline;
