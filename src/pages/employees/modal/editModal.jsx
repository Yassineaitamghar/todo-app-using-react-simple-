import { Modal, Spin, Input, Avatar, Button, Flex, DatePicker, Space } from 'antd';
import { useState, useEffect } from 'react';
import { useGetEmployeeByIdQuery, useUpdateEmployeeMutation, useAddPhotoEmployeeMutation } from '../store/postsApi';
import { useDropzone } from 'react-dropzone';
import '../style.scss';
import moment from 'moment';
const initialState = {
   name: '',
   surname: '',
   dateOfBirth: '',
   patronymic: '',
};

const EditModal = ({ editModalOpen, setEditModalOpen }) => {
   const [formData, setFormData] = useState(initialState);

   const { data, isFetching: isFetchingGetEmployeeById } = useGetEmployeeByIdQuery(editModalOpen, {
      skip: !editModalOpen,
   });
   const [editEmployee, { isLoading: isLoadingEditEmployee }] = useUpdateEmployeeMutation();
   const [addPhotoEmployee, { isLoading: isLoadingEditPhoto }] = useAddPhotoEmployeeMutation();

   useEffect(() => {
      if (data !== undefined) {
         setFormData({
            name: data.name,
            dateOfBirth: data.dateOfBirth,
            patronymic: data.patronymic,
            surname: data.surname,
         });
      }
   }, [JSON.stringify(data)]);

   const handleInputChange = e => {
      const { name, value } = e.target;
      setFormData(prevData => ({ ...prevData, [name]: value }));
   };
   const handleDateChange = (date, dateString) => {
      setFormData(prevData => ({ ...prevData, dateOfBirth: dateString }));
   };

   const handleEdit = () => {
      const updatedData = {
         id: editModalOpen,
         updatedTodo: formData,
      };

      editEmployee(updatedData)
         .unwrap()
         .then(() => setEditModalOpen(false))
         .catch(err => console.log(err));
   };
   const { open } = useDropzone({
      onDrop: acceptedFile => addPhotoEmployee({ id: editModalOpen, picture: acceptedFile[0] }),
      accept: {
         'image/*': [],
      },
      noClick: true,
      noKeyboard: true,
      multiple: false,
      disabled: false,
   });
   return (
      <Modal
         open={editModalOpen}
         title='Edit row'
         onOk={handleEdit}
         confirmLoading={isLoadingEditEmployee}
         onCancel={() => setEditModalOpen(false)}
         modalRender={container => <Spin spinning={isFetchingGetEmployeeById}>{container}</Spin>}
      >
         <form className='editForm'>
            <Space direction='vertical' size={7}>
               <label>
                  <Spin spinning={isLoadingEditPhoto || isFetchingGetEmployeeById}>
                     <Flex gap={16} align='center'>
                        <Avatar
                           src={data?.picturePath}
                           size={128}
                           style={{ zIndex: 4, borderColor: '#5F9EA0FF', border: 1, borderStyle: 'solid' }}
                        />
                        <Button
                           size='small'
                           className='uploadBtn'
                           style={{
                              margin: '0 16px',
                              verticalAlign: 'middle',
                              background: '#1677ff',
                              color: 'white',
                              height: 32,
                              borderRadius: 6,
                              padding: '4px,15px',
                           }}
                           onClick={open}
                        >
                           Upload
                        </Button>
                     </Flex>
                  </Spin>
               </label>
               <label>
                  <Input
                     placeholder='Name'
                     type='text'
                     name='name'
                     value={formData.name}
                     onChange={handleInputChange}
                  />
               </label>
               <label>
                  <Input
                     placeholder='Surname'
                     type='text'
                     name='surname'
                     value={formData.surname}
                     onChange={handleInputChange}
                  />
               </label>
               <label>
                  <DatePicker
                     placeholder='Birthday'
                     type='date'
                     name='dateOfBirth'
                     value={formData.dateOfBirth ? moment(formData.dateOfBirth, 'YYYY-MM-DD') : null}
                     onChange={handleDateChange}
                  />
               </label>
               <label>
                  <Input
                     placeholder='Patronymic'
                     type='text'
                     name='patronymic'
                     value={formData.patronymic}
                     onChange={handleInputChange}
                  />
               </label>
            </Space>
         </form>
      </Modal>
   );
};

export default EditModal;
