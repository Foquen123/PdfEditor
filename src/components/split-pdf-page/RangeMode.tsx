import { ReactNode } from 'react';

interface ITabProps {
  children: ReactNode;
  isSelect?: boolean;
  onClick: () => void;
}

export default function RangeMode({
  children,
  isSelect = false,
  onClick,
}: ITabProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center py-3.5 px-4 text-text-secondary bg-[#ebebeb] rounded-lg select-none cursor-pointer"
      style={{
        color: isSelect ? 'var(--accent-color)' : undefined,
        outline: isSelect ? '1px solid var(--accent-color)' : undefined,
      }}
    >
      {children}
    </div>
  );
}
