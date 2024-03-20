import { type InputFormProps } from '../types';

export const InputForm = ({
  value,
  handleChange,
  nameValue,
  tCss,
  placeholder,
  type,
  name,
}: InputFormProps): JSX.Element => {
  return (
    <>
      <label>
        <p>{name}</p>
        <input
          className={`p-2 rounded-md w-80 border-2 text-black ${tCss}`}
          type={type}
          name={nameValue}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </label>
    </>
  );
};
