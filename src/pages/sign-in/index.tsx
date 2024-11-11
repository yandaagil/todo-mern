import { Button, Divider } from 'antd';
import { signIn } from 'next-auth/react';
import { GoogleOutlined } from '@ant-design/icons';
import Head from 'next/head';

const SignIn = () => (
  <>
    <Head>
      <title>Sign-In | Todo</title>
    </Head>
    <div className="container mx-auto py-5 px-5 md:py-16 space-y-5 md:max-w-2xl">
      <header>
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
  </>

);

export default SignIn;