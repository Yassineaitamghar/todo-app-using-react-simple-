import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './style.scss';
import { useSignInMutation } from './store/authApi';
import { Link } from 'react-router-dom';

const Login = () => {
   const [form] = Form.useForm();
   const [signIn, { isLoading: isLoadingSingIn }] = useSignInMutation();

   const onFinish = values => {
      signIn(values);
   };

   return (
      <Form form={form} name='horizontal_login' layout='inline' onFinish={onFinish}>
         <div className='form'>
            <h1>LOGIN</h1>
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
            <Form.Item shouldUpdate className='fromButton'>
               {() => (
                  <Button
                     type='primary'
                     htmlType='submit'
                     loading={isLoadingSingIn}
                     disabled={
                        !form.isFieldsTouched(true) ||
                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                     }
                  >
                     Log in
                  </Button>
               )}
            </Form.Item>
            <Link to='/register'>Sign Up</Link>
         </div>
      </Form>
   );
};

export default Login;
