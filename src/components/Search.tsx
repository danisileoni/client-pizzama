import { IconSearch } from './icons/IconSearch';

type Props = {
  placeholder: string;
};

export const Search = ({ placeholder }: Props): JSX.Element => {
  return (
    <form className="relative">
      <input
        type="text"
        className="focus:outline-none bg-1f1f1f p-1.5 pr-3 pl-8 rounded-full  min-w-80"
        placeholder={placeholder}
      />
      <IconSearch tCss="absolute inset-y-2 inset-x-2 text-pholder w-5 h-5" />
    </form>
  );
};
