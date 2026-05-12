import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      type="number"
      className="text-right py-3 grow w-full text-[14px] border border-border rounded-sm"
    />
  );
}
