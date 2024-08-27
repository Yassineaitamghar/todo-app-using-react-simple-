import { Modal, Button, Flex, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUserPhoto, updateUser } from '../../../store/user';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import FormInput from '../../../components/form-input';
import validationSchema from '../store/validation';
import { useDropzone } from 'react-dropzone';

const EditUser = ({ setUserEditOpen, userEditOpen }) => {
   const dispatch = useDispatch();
   const { user, isUpdating } = useSelector(selectUser);

   const { control, handleSubmit, reset } = useForm({
      defaultValues: {
         name: '',
      },
      resolver: yupResolver(validationSchema),
   });

   const { open } = useDropzone({
      onDrop: acceptedFile => dispatch(updateUserPhoto({ picture: acceptedFile[0] })),
      accept: {
         'image/*': [],
      },
      noClick: true,
      noKeyboard: true,
      multiple: false,
      disabled: false,
   });

   const onSubmit = validateValues => {
      console.log(validateValues);
      dispatch(updateUser(validateValues))
         .unwrap()
         .then(() => setUserEditOpen(false))
         .catch(err => console.log(err));
   };

   return (
      <Modal
         open={userEditOpen}
         title='Edit row'
         okButtonProps={{
            form: 'form',
            htmlType: 'submit',
         }}
         confirmLoading={isUpdating}
         onCancel={() => setUserEditOpen(false)}
         afterOpenChange={open => {
            if (open) {
               reset({
                  name: user.name,
               });
            }
         }}
      >
         <form id='form' onSubmit={handleSubmit(onSubmit)}>
            <Flex vertical gap={16}>
               <Flex gap={16} align='center'>
                  <Avatar src={user?.picturePath} size={128} style={{ zIndex: 4 }}>
                     {user?.name[0]}
                  </Avatar>
                  <Button size='small' style={{ margin: '0 16px', verticalAlign: 'middle' }} onClick={open}>
                     Upload
                  </Button>
               </Flex>
               <FormInput placeholder='Name' type='text' name='name' control={control} />
            </Flex>
         </form>
      </Modal>
   );
};

export default EditUser;
