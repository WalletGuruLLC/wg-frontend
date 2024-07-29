import {
  LogOut as CiLogout,
  UserRoundCog,
  Building2
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SidebarItem } from './SidebarItem';

const menuitem = [
  {
    icon: <UserRoundCog size={30} />,
    title: 'Users',
    path: '/users'
  },
  {
    icon: <Building2 size={30} />,
    title: 'Service Providers',
    path: '/sp'
  },
]

export const Sidebar = () => {
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
    <div>
      <div className="-mx-6 px-6 py-4">
        <Link href="#" title="home">
          <Image src="/images/logo.png" className="w-16 mx-auto" alt="Wallet Guru logo"
          width={50}
          height={50}
          />
        </Link>
      </div>
      
      <div className="mt-8 text-center">
       <span className="hidden text-gray-400 lg:block">Admin</span>
      </div>

      <ul className="space-y-2 tracking-wide mt-8">
        {
          menuitem.map( item => (
            <SidebarItem key={item.path} {...item} />
          ))
        }
      </ul>
    </div>

    <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
      <Link
          href='/'
          className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
        >
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </Link>
    </div>
  </aside>
  )
}
