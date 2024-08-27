import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Todo from './pages/employees';
import Login from './pages/login';
import UserOffline from './pages/login/components/useroffline';
import UserOnline from './pages/login/components/useronline';
import MyProfile from './pages/myprofile';
import Register from './pages/register';
import User from './pages/users';
import UserGuest from './pages/login/components/userGuest.jsx';

function App() {
   return (
      <>
         <Header />
         <Routes>
            <Route
               path='/'
               element={
                  <UserOnline>
                     <Todo />
                  </UserOnline>
               }
            />
            <Route
               path='/users'
               element={
                  <UserOnline>
                     <UserGuest>
                        <User />
                     </UserGuest>
                  </UserOnline>
               }
            />
            <Route
               path='/myprofile'
               element={
                  <UserOnline>
                     <MyProfile />
                  </UserOnline>
               }
            />
            <Route
               path='/login'
               element={
                  <UserOffline>
                     <Login />
                  </UserOffline>
               }
            />
            <Route
               path='/register'
               element={
                  <UserOffline>
                     <Register />
                  </UserOffline>
               }
            />
         </Routes>
      </>
   );
}

export default App;
