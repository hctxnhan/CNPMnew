type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  className?: string;
  buttonType?: ButtonType;
  type?: 'button' | 'submit';
};

export type ButtonType =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info'
  | 'disabled';

type ButtonStyle = {
  [key in ButtonType]: string;
};

const buttonStyle: ButtonStyle = {
  primary: 'bg-emerald-600 text-white hover:bg-emerald-700',
  secondary:
    'bg-white border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
  success: 'bg-green-600 text-white hover:bg-green-700',
  info: 'bg-gray-400 text-white hover:bg-gray-500',
  disabled: 'bg-gray-300 text-gray-500 cursor-not-allowed',
};

function Button({
  children,
  onClick,
  className,
  buttonType = 'primary',
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border px-2 py-1 rounded-md flex items-center justify-center transition-all ${buttonStyle[buttonType]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
