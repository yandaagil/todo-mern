import ProfileMenu from '@/components/profileMenu'
import { Divider } from 'antd'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import React, { FC } from 'react'

type LayoutProps = {
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Todo</title>
      </Head>
      <div className="container mx-auto py-5 px-5 md:py-16 space-y-5 md:max-w-2xl">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">To-Do</h2>
          {session && <ProfileMenu />}
        </header>
        <Divider />
        <main>
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout