import {BookmarkCheck as CiBookmarkCheck } from 'lucide-react';

export const SidebarItem = () => {
  {
    /* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 
    <li>
          <a href="#" className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <CiBookmarkCheck size={30} />
            <span className="group-hover:text-gray-700">Categories</span>
          </a>
        </li> */
  }
  return (
    <li>
      <a
        href="#"
        className="relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-blue-950 to-cyan-400 px-4 py-3 text-white"
      >
        <CiBookmarkCheck size={30} />
        <span className="-mr-1 font-medium">Dashboard</span>
      </a>
    </li>
  );
};
