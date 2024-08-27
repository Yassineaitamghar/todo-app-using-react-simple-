import { useState } from 'react';
import { Modal, Input, DatePicker, Space } from 'antd';
import { useAddEmployeeMutation } from '../store/postsApi';
import moment from 'moment';
const initialState = {
   name: '',
   surname: '',
   dateOfBirth: '2003-12-08',
   patronymic: '',
};

const AddModal = ({ addModalOpen, setAddModalOpen }) => {
   const [addEmployee, { isLoading: isLoadingAddEmployee }] = useAddEmployeeMutation();
   const [formData, setFormData] = useState(initialState);

   const handleDateChange = (date, dateString) => {
      setFormData(prevData => ({ ...prevData, dateOfBirth: dateString }));
   };

   const handleInputChange = e => {
      const { name, value } = e.target;
      setFormData(prevData => ({ ...prevData, [name]: value }));
   };

   const handleAdd = async () => {
      const newData = {
         name: formData.name,
         surname: formData.surname,
         dateOfBirth: formData.dateOfBirth,
         patronymic: formData.patronymic,
      };
      try {
         await addEmployee(newData);
         setAddModalOpen(false);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <Modal
         open={addModalOpen}
         title='Add row'
         onOk={handleAdd}
         confirmLoading={isLoadingAddEmployee}
         onCancel={() => setAddModalOpen(false)}
         afterClose={() => setFormData(initialState)}
      >
         <form className='addForm'>
            <Space direction='vertical' size={7}>
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

export default AddModal;
