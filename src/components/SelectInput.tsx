import { useState, useEffect } from 'react';

type SelectInputProps = {
  // children is a list of SelectOption components
  options: {
    value: string;
    label?: string;
  }[];
  onChange?: (value: string) => void;
};
function SelectInput({ options, onChange }: SelectInputProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]?.value);

  useEffect(() => {
    onChange && onChange(selectedOption);
  }, [selectedOption]);

  return (
    <div className='relative'>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        className='block appearance-none p-2 w-full border border-gray-300 rounded-lg focus:ring focus:outline-none'
      >
        {options.map((option) => (
          <SelectOption
            key={option.value}
            value={option.value}
            label={option.label ? option.label : option.value}
          />
        ))}
      </select>
    </div>
  );
}

type SelectOptionProps = {
  value: string;
  label: string;
};

export function SelectOption({ value, label }: SelectOptionProps) {
  return <option value={value}>{label}</option>;
}

export default SelectInput;
