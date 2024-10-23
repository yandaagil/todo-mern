import Link from 'next/link'
import ProfileMenu from './profileMenu'

const Header = () => {
  return (
    <header className="mt-16 flex justify-between items-center">
      <Link href='/'>
        <h2 className="text-2xl font-bold">To-Do</h2>
      </Link>
      <ProfileMenu />
    </header>
  )
}

export default Header