// import { getUserInfo, selectUser } from './store/user';
// import { useSelector } from 'react-redux';
import { Spin, Flex } from 'antd';
// import { selectUser } from './store/user';
// import { selectAuth } from './pages/login/store/auth';
import Utils from './common/utils';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, selectUser } from './store/user/index';
import { useEffect } from 'react';

const Auth = ({ children }) => {
   const dispatch = useDispatch();

   const { isGetting } = useSelector(selectUser);

   useEffect(() => {
      if (Utils.getAccessToken()) {
         dispatch(getUserInfo());
      }
   }, [dispatch]);

   if (isGetting) {
      return (
         <Flex align='center' justify='center' style={{ height: '100vh' }}>
            <Spin />
         </Flex>
      );
   }

   return <>{children}</>;
};

export default Auth;
