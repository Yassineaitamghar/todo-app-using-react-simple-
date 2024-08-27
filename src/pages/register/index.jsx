import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './style.scss';
import { Link } from 'react-router-dom';
import { useSignUpMutation } from './store/authApi';

const Register = () => {
   const [form] = Form.useForm();
   const [signUp, { Loading: isLoadingSingUp }] = useSignUpMutation();
   const onFinish = values => {
      signUp(values);
   };

   return (
      <Form form={form} name='horizontal_login' layout='inline' onFinish={onFinish}>
         <div className='form'>
            <h1>Register</h1>
            <Form.Item
               name='name'
               rules={[
                  {
                     required: true,
                     message: 'Please input your name!',
                  },
               ]}
            >
               <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Name'
                  className='fromInput'
               />
            </Form.Item>
            <Form.Item
               name='username'
               rules={[
                  {
                     required: true,
                     message: 'Please input your username!',
                  },
               ]}
            >
               <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  placeholder='Username'
                  className='fromInput'
               />
            </Form.Item>
            <Form.Item
               name='password'
               rules={[
                  {
                     required: true,
                     message: 'Please input your password!',
                  },
               ]}
            >
               <Input.Password
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='Password'
                  className='fromInput'
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
               />
            </Form.Item>
            <Form.Item
               name='passwordConfirmation'
               rules={[
                  {
                     required: true,
                     message: 'Please input your password!',
                  },
               ]}
            >
               <Input.Password
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder='password confirmation'
                  className='fromInput'
                  iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
               />
            </Form.Item>
            <Form.Item shouldUpdate className='fromButton'>
               {() => (
                  <Button
                     type='primary'
                     htmlType='submit'
                     loading={isLoadingSingUp}
                     disabled={
                        !form.isFieldsTouched(true) ||
                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                     }
                  >
                     Log in
                  </Button>
               )}
            </Form.Item>
            <Link to='/login'>I have already account</Link>
         </div>
      </Form>
   );
};

export default Register;
