import Button from './Button';

type ConfirmationPopupProps = {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmationPopup({
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmationPopupProps) {
  return (
    <div>
      {/* <div className='fixed inset-0 bg-slate-800 opacity-60'></div> */}
      <div className='fixed max-w-[500px] bg-white p-6 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 shadow-lg'>
        <h1 className='text-center text-lg font-semibold'>{title}</h1>
        <p className='text-gray-500'>{description}</p>
        <div className='flex gap-2 justify-center '>
          <Button buttonType='danger' onClick={onCancel}>
            Hủy
          </Button>
          <Button buttonType='primary' onClick={onConfirm}>
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
