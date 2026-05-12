import { ReactNode } from 'react';

interface ITabProps {
  children: ReactNode;
  isSelect?: boolean;
  onClick: () => void;
}

export default function Tab({ children, isSelect = false, onClick }: ITabProps) {
  return (
    <div
      onClick={onClick}
      className="py-7.75 grow flex justify-center items-center last:border-l last:border-border cursor-pointer relative"
      style={{
        borderBottom: !isSelect ? '1px solid var(--border-color)' : undefined,
      }}
    >
      <div
        className="absolute top-2 left-2 w-4.5 h-4.5 rounded-[100%] bg-[#6fe993] flex justify-center items-center"
        style={{ display: isSelect ? undefined : 'none' }}
      >
        <svg
          width="18"
          height="15"
          viewBox="0 0 18 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 4L7.125 10.875L4 7.75"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {children}
    </div>
  );
}
