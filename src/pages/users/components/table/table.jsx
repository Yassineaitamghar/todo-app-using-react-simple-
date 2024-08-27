import { Button, Popconfirm, Table as T } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AddUser from '../../modal/addUser';
import './style.scss';
import { useGetUsersQuery, useDeleteUserMutation } from '../../store/usersApi';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../store/user/index.js';
const Table = () => {
   const [addUserOpen, setAddUserOpen] = useState(false);
   const { data: users = [], isLoading: isLoadingGetUsers } = useGetUsersQuery();
   const [deleteUser, { isLoading: isLoadingDeleteUser }] = useDeleteUserMutation();

   const handleDelete = id => {
      deleteUser(id)
         .unwrap()
         .then(() => console.log('silindi'))
         .catch(error => {
            console.error('Failed to delete user:', error);
         });
   };
   const { user } = useSelector(selectUser);
   return (
      <div className='user-table'>
         <Button
            onClick={() => setAddUserOpen(true)}
            type='primary'
            style={{
               marginBottom: 16,
            }}
         >
            Add a row
         </Button>
         <T
            className='table'
            rowClassName='editable-row'
            bordered
            rowKey='id'
            loading={isLoadingGetUsers || isLoadingDeleteUser}
            dataSource={users}
            scroll={{
               x: 'max-content',
            }}
            columns={[
               {
                  title: 'ID',
                  dataIndex: 'id',
                  editable: true,
               },
               {
                  title: 'Name',
                  dataIndex: 'name',
               },

               {
                  title: 'Username',
                  dataIndex: 'username',
               },
               {
                  title: 'Role',
                  dataIndex: 'role',
               },
               {
                  title: 'Picture',
                  dataIndex: 'picturePath',
                  render: value => (
                     <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden' }}>
                        {value ? (
                           <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden' }}>
                              <img alt={value} src={value} style={{ maxWidth: '100%' }} />
                           </div>
                        ) : (
                           <img alt='default user' src='/img.png' className='userIcon' />
                        )}
                     </div>
                  ),
               },
               {
                  title: 'Cover',
                  dataIndex: 'coverPath',
                  render: value => (
                     <div
                        style={{
                           width: 64,
                           height: 64,
                           display: 'flex',
                           justifyContent: 'center',
                        }}
                     >
                        <img alt={value} src={value} style={{ maxWidth: '100%' }} />
                     </div>
                  ),
               },
               {
                  title: 'Created',
                  dataIndex: 'createdAt',
                  render: createdAt => dayjs(createdAt).format('DD.MM.YYYY / HH:mm'),
               },
               {
                  dataIndex: 'operation',
                  fixed: 'right',
                  render: (_, record) => {
                     return (
                        <>
                           <Popconfirm title='Delete?' onConfirm={() => handleDelete(record.id)}>
                              {record.id === user.id ? null : (
                                 <DeleteOutlined style={{ color: 'red', marginLeft: 12 }} />
                              )}
                           </Popconfirm>
                        </>
                     );
                  },
               },
            ]}
         />
         <AddUser addUserOpen={addUserOpen} setAddUserOpen={setAddUserOpen} />
      </div>
   );
};
export default Table;
