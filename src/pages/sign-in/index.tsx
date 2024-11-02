import { FC } from 'react';
import { Button } from 'antd';
import { signIn } from 'next-auth/react';
import { GoogleOutlined } from '@ant-design/icons';

const SignIn: FC = () => (
  <section className="space-y-5">
    <Button
      type='primary'
      className='w-full'
      onClick={() => signIn('google')}
      icon={<GoogleOutlined />}
    >
      Sign In
    </Button>
  </section>
);

export default SignIn;