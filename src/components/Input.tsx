import { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...props }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          className='w-full p-2 border border-gray-300 rounded-lg focus:ring focus:outline-none'
          {...props}
        />
        {error && <p className='text-red-400 text-sm'>{error}</p>}
      </div>
    );
  }
);

export default Input;
