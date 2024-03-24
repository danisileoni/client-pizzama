import { Link } from 'react-router-dom';
import { Search } from './Search';
import { IconSetting } from './icons/IconSetting';
import { IconHome } from './icons/IconHome';
import { IconTasks } from './icons/IconTasks';

export const Navbar = (): JSX.Element => {
  return (
    <nav className="pr-32 pl-32 bg-indigo-900 min-h-14 p-2 flex justify-between items-center">
      <Link className="text-4xl font-semibold" to="/plataform">
        Pizzma
      </Link>
      <Search placeholder="Search Project" />
      <div className="flex justify-between gap-8">
        <Link
          to="/plataform"
          className="flex flex-col justify-center items-center"
        >
          <IconHome tCss="w-6 h-6" />
          <span className="text-xs">home</span>
        </Link>
        <Link
          to="/plataform"
          className="flex flex-col justify-center items-center"
        >
          <IconTasks tCss="w-6 h-6" />
          <span className="text-xs">Your Tasks</span>
        </Link>
      </div>
      <button>
        <IconSetting tCss="h-6 w-6 text-withe" />
      </button>
    </nav>
  );
};
