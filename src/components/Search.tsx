import { AiOutlineSearch } from 'react-icons/ai';

function Search() {
  return (
    <div className='flex items-stretch gap-2'>
      <input type='text' className='p-2 px-4 text-lg rounded-md' />
      <button className='bg-black flex items-center p-2 rounded-md'>
        <AiOutlineSearch size={30} className='text-white' />
      </button>
    </div>
  );
}

export default Search;
