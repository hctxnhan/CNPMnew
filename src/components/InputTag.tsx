import { IoIosClose } from 'react-icons/io';

type InputTagProps = {
  tag: string;
  remove: () => void;
};

function InputTag({ tag, remove }: InputTagProps) {
  return (
    <div
      onClick={() => console.log('Why called?')}
      className='bg-gray-200 py-1 rounded-md text-sm flex items-center justify-between px-1 gap-1'
    >
      <p className='whitespace-nowrap pl-1'>{tag}</p>
      <p
        onClick={(e) => {
          remove();
        }}
        className='hover:bg-gray-300 rounded-md cursor-pointer'
      >
        <IoIosClose size={20} />
      </p>
    </div>
  );
}

export default InputTag;
