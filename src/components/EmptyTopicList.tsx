import { ImFilesEmpty } from 'react-icons/im';

function EmptyTopicList() {
  //centering
  return (
    <div
      className='
    flex flex-col items-center justify-center
    mt-20 gap-4
  '
    >
      <ImFilesEmpty size={60} />
      <span className=' text-gray-700 text-2xl'>
        Không có đề tài nào trong đợt đăng ký này!
      </span>
    </div>
  );
}

export default EmptyTopicList;
