import useTagInput from '../hooks/useTagInput';
import { useState } from 'react';
import InputTag from './InputTag';
import {
  UseControllerProps,
  useController,
  FieldValues,
} from 'react-hook-form';
import { useEffect } from 'react';

type TagInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

function TagInputComponent({ value, onChange }: TagInputProps) {
  const [tagInput, setTagInput] = useState('');
  const { tags, addTag, removeTag } = useTagInput();

  useEffect(() => {
    onChange(tags);
    console.log(tags);
  }, [tags]);

  const tagsComponent = tags.map((tag) => (
    <InputTag key={tag} tag={tag} remove={() => removeTag(tag)} />
  ));

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex gap-1 flex-wrap'>{tagsComponent}</div>
      <input
        className='w-full p-2 border border-gray-300 rounded-lg focus:ring focus:outline-none'
        type='text'
        placeholder='Mục tiêu (nhấn Enter để thêm)'
        value={tagInput}
        onChange={(e) => {
          setTagInput(e.target.value);
        }}
        onKeyDown={(e) => {
          e.stopPropagation();

          if (e.key === 'Enter') {
            e.preventDefault();
            addTag(tagInput);
            console.log('Add tag: ' + tagInput);
            setTagInput('');
          }
        }}
      />
    </div>
  );
}

export default TagInputComponent;
