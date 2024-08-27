import { useDeleteEmployeeMutation, useGetEmployeesQuery } from '../../store/postsApi';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditModal from '../../../employees/modal/editModal';
import AddModal from '../../../employees/modal/addModal';
import { Button, Popconfirm, Table as T } from 'antd';
import { useSearchParams } from 'react-router-dom';
import './style.scss';
import { useState } from 'react';
import dayjs from 'dayjs';

const Table = () => {
   const [addModalOpen, setAddModalOpen] = useState(false);
   const [editModalOpen, setEditModalOpen] = useState(false);
   const [searchParams, setSearchParams] = useSearchParams();
   const current = Number(searchParams.get('page')) || 1;
   const limit = Number(searchParams.get('limit')) || 10;

   const {
      data: { data: employees = [], ...pagination } = {},
      isLoading: isLoadingGetEmployees,
      isFetching: isFetchingGetEmplyoees,
   } = useGetEmployeesQuery({
      page: current,
      limit,
   });

   const [deleteEmployee, { isLoading: isLoadingDeleteEmployee }] = useDeleteEmployeeMutation();
   const handleDelete = id => {
      deleteEmployee(id)
         .unwrap()
         .then(() => console.log('silindi'))
         .catch(error => {
            console.error('Failed to delete employee:', error);
         });
   };

   const handlePageChange = (page, pageSize) => {
      setSearchParams(prev => {
         if (page === 1 && pageSize === 10) {
            prev.delete('page');
            prev.delete('limit');
         } else {
            prev.set('page', page);
            prev.set('limit', pageSize);
         }
         return prev;
      });
   };

   return (
      <div className='home-table'>
         <Button
            onClick={() => setAddModalOpen(true)}
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
            loading={isLoadingGetEmployees || isLoadingDeleteEmployee}
            dataSource={employees}
            scroll={{
               x: 'max-content',
            }}
            pagination={{
               current,
               onChange: handlePageChange,
               total: pagination?.totalItems,
               pageSize: limit,
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
                  title: 'Surname',
                  dataIndex: 'surname',
               },
               {
                  title: 'Birthday',
                  dataIndex: 'dateOfBirth',
                  render: dateOfBirth => dayjs(dateOfBirth).format('DD.MM.YYYY'),
               },
               {
                  title: 'Age',
                  dataIndex: 'age',
               },
               {
                  title: 'Patronymic',
                  dataIndex: 'patronymic',
               },
               {
                  title: 'Picture',
                  dataIndex: 'picturePath',
                  render: value => (
                     <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {value ? (
                           <div
                              style={{
                                 width: 64,
                                 height: 64,
                                 borderRadius: '50%',
                                 overflow: 'hidden',
                              }}
                           >
                              <img alt='userName Photo' src={value} style={{ maxWidth: '100%' }} />
                           </div>
                        ) : (
                           <img alt='default image' src='/img.png' className='tableUserIcon' />
                        )}
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
                           <EditOutlined onClick={() => setEditModalOpen(record.id)} />
                           <Popconfirm title='Delete?' onConfirm={() => handleDelete(record.id)}>
                              <DeleteOutlined style={{ color: 'red', marginLeft: 12 }} />
                           </Popconfirm>
                        </>
                     );
                  },
               },
            ]}
         />
         <AddModal setAddModalOpen={setAddModalOpen} addModalOpen={addModalOpen} />
         <EditModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} />
      </div>
   );
};
export default Table;
