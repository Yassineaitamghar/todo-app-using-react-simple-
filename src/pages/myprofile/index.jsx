import { selectUser, updateCoverPhoto } from '../../store/user';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import EditUser from './components/editUser';
import { useDropzone } from 'react-dropzone';
import './style.scss';

const { Meta } = Card;

const MyProfile = () => {
   const [userEditOpen, setUserEditOpen] = useState(false);
   const dispatch = useDispatch();
   const { user } = useSelector(selectUser);

   const { open } = useDropzone({
      onDrop: acceptedFile => dispatch(updateCoverPhoto({ picture: acceptedFile[0] })),
      accept: {
         'image/*': [],
      },
      noClick: true,
      noKeyboard: true,
      multiple: false,
      disabled: false,
   });

   return (
      <>
         <Card
            className='card-design'
            cover={
               <>
                  <img
                     alt='example'
                     src={user?.coverPath}
                     className='coverPicture'
                     style={{ maxWidth: '100%', objectFit: 'cover' }}
                  />
                  <div className='coverBackground'></div>
                  <Button size='small' className='coverButton' onClick={open}>
                     <UploadOutlined style={{ color: 'white', fontSize: 30 }} />
                  </Button>
               </>
            }
         >
            <Meta
               avatar={
                  <div style={{ position: 'relative', zIndex: 2 }}>
                     <Avatar src={user?.picturePath} size={128} className='profil_picture' />
                     <Button
                        onClick={() => setUserEditOpen(user?.id)}
                        style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 2 }}
                     >
                        <EditOutlined key='edit' />
                     </Button>
                  </div>
               }
               title={<h1>{user?.name}</h1>}
            />
         </Card>
         <EditUser setUserEditOpen={setUserEditOpen} userEditOpen={userEditOpen} />
      </>
   );
};

export default MyProfile;
