import { Link } from 'react-router-dom';
import { Search } from './Search';
import { IconSetting } from './icons/IconSetting';
import { IconHome } from './icons/IconHome';
import { IconTasks } from './icons/IconTasks';
import { IconProject } from './icons/IconProject';

export const Navbar = (): JSX.Element => {
  return (
    <nav className="pr-32 pl-32 bg-indigo-900 min-h-14 p-2 flex justify-between items-center">
      <Link className="text-4xl font-semibold" to="/platform">
        Pizzama
      </Link>
      <Search placeholder="Search Project" />
      <div className="flex justify-between gap-2">
        <Link
          to="/platform"
          className="flex flex-col min-w-14 pr-2 pl-2 pb-1 pt-1 rounded-md hover:transition-all hover:bg-indigo-700 justify-center items-center hover:shadow-md"
        >
          <IconHome tCss="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          to="/platform/tasks"
          className="flex flex-col min-w-14 pr-2 pl-2 pb-1 pt-1 rounded-md hover:transition-all hover:bg-indigo-700 justify-center hover:shadow-md items-center"
        >
          <IconTasks tCss="w-6 h-6" />
          <span className="text-xs">Tasks</span>
        </Link>
        <Link
          to="/platform/projects"
          className="flex flex-col min-w-14 pr-2 pl-2 pb-1 pt-1 rounded-md hover:transition-all hover:bg-indigo-700 justify-center hover:shadow-md items-center"
        >
          <IconProject tCss="w-6 h-6" />
          <span className="text-xs">Projects</span>
        </Link>
      </div>
      <button className="flex flex-col min-w-14 min-h-12 pr-2 pl-2 pb-1 pt-1 rounded-md hover:transition-all hover:bg-indigo-700 justify-center hover:shadow-md items-center">
        <IconSetting tCss="h-6 w-6 text-withe" />
        <span className="text-xs">Settings</span>
      </button>
    </nav>
  );
};
