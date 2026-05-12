import { ReactNode } from 'react';

export default function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-bold text-[42px] text-center text-text">{children}</h1>
  );
}
