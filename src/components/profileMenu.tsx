import { Button, Dropdown, MenuProps } from 'antd';
import { ChevronDown } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import React from 'react'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: "Log Out",
    danger: true,
  },
];

const onClick: MenuProps['onClick'] = () => {
  signOut()
};

const ProfileMenu = () => {
  const { data: session } = useSession()

  return (
    <>
      {session &&
        <Dropdown menu={{ items, onClick }} trigger={['click']} placement="bottom" arrow>
          <Button icon={<ChevronDown size={16} />} iconPosition="end">{session?.user?.name}</Button>
        </Dropdown>
      }
    </>
  )
}

export default ProfileMenu