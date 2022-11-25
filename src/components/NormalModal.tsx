import { GrClose } from 'react-icons/gr';

type NormalModalProps = {
  children: JSX.Element;
  onClose: () => void;
  title?: string;
};

function NormalModal({ children, onClose, title }: NormalModalProps) {
  return (
    <div className='fixed flex flex-col bg-white p-4 rounded-lg shadow-lg w-[500px] max-h-[700px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden'>
      <div className='h-full'>
        <div className='flex mb-4'>
          <div className='flex-grow text-lg font-semibold text-center'>
            <h1>{title}</h1>
          </div>
          <button
            onClick={onClose}
            className='border w-[30px] h-[30px] rounded-md flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 transition-all'
          >
            <GrClose size={20} />
          </button>
        </div>
        <div className='h-full'>{children}</div>
      </div>
    </div>
  );
}

export default NormalModal;
