import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useUserSignOutMutation } from '../../pages/login/store/authApi';
import { Dropdown, Card, Space, Avatar, Button, Menu } from 'antd';
import { selectUser } from '../../store/user';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import './style.scss';

const Header = () => {
   const { user } = useSelector(selectUser);
   const [signOut] = useUserSignOutMutation();
   const { Meta } = Card;
   const items = [
      {
         type: 'divider',
      },
      {
         icon: <UserOutlined />,
         label: <Link to='/myprofile'>My Profile</Link>,
         key: '1',
      },
      {
         icon: <LogoutOutlined />,
         label: <a onClick={() => signOut()}>Log out</a>,
         key: '3',
      },
   ];
   console.log(items);

   return (
      <div className='header'>
         <h1>Todo App</h1>
         {user && (
            <div className='navbar'>
               <NavLink to='/'>Employees</NavLink>
               {user.role !== 'guest' ? <NavLink to='/users'>Users</NavLink> : null}
            </div>
         )}

         <div>
            {user ? (
               <Dropdown
                  menu={{
                     items,
                  }}
                  dropdownRender={() => (
                     <Card>
                        <Meta avatar={<Avatar src={user?.picturePath} />} title={user?.name} />
                        <Menu className='menu_list' mode='inline' items={items} />
                     </Card>
                  )}
                  placement='bottomRight'
                  trigger={['click']}
                  rootClassName='user-dropdown'
               >
                  <a onClick={e => e.preventDefault()}>
                     <Space>
                        <Button type='primary' size='large'>
                           {!user?.name ? (
                              'Log In'
                           ) : (
                              <span>
                                 <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                                    {user.name && `Welcome, ${user.name.toUpperCase()}!`}
                                    <img
                                       alt={user.name}
                                       src={user?.picturePath}
                                       style={{ width: 20, height: 20, borderRadius: '50%', overflow: 'hidden' }}
                                    ></img>
                                 </div>
                              </span>
                           )}
                           <DownOutlined />
                        </Button>
                     </Space>
                  </a>
               </Dropdown>
            ) : (
               <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <Link
                     to='/login'
                     style={{
                        textDecoration: 'none',
                        color: 'white',
                        fontSize: 20,
                        background: '#1677ff',
                        borderRadius: 15,
                        padding: 10,
                        display: 'flex',
                        alignItems: 'center',
                     }}
                  >
                     Login
                  </Link>
                  <Link
                     to='/register'
                     style={{
                        textDecoration: 'none',
                        color: 'white',
                        fontSize: 20,
                        background: '#1677ff',
                        borderRadius: 15,
                        padding: 10,
                        display: 'flex',
                        alignItems: 'center',
                     }}
                  >
                     Register
                  </Link>
               </div>
            )}
         </div>
      </div>
   );
};

export default Header;
