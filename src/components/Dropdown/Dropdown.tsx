import { Dispatch, SetStateAction } from 'react';

interface DropdownProps {
  options: { value: string | number; label: string }[];
  placeholder?: string;
  setValue: Dispatch<SetStateAction<any>>;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder,
  setValue,
}) => {
  return (
    <select
      onChange={(e) => setValue(e.target.value)}
      className="cursor-pointer bg-[#3a3c44] p-2 rounded-md outline-none"
    >
      <option value={''}>{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
