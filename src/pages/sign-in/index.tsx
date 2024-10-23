import { FC } from 'react';
import { Button, Divider } from 'antd';
import { signIn } from 'next-auth/react';
import { GoogleOutlined } from '@ant-design/icons';

const SignIn: FC = () => (
  <div className="container mx-auto space-y-5 md:max-w-2xl">
    <header className="mt-16 flex justify-between items-center">
      <h2 className="text-2xl font-bold">To-Do</h2>
    </header>
    <Divider />
    <main>
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
    </main>
  </div>

);

export default SignIn;